import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import { Tabs, Tab, commaSeparate } from 'ot-ui';

import * as facetsObject from './facetIndex';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import { FacetContainer } from '../../components/Facets';

const facets = Object.values(facetsObject);

const associationsQuery = gql`
  query TargetAssociationsQuery(
    $ensgId: String!
    $first: Int
    $after: String
    $facets: TargetDiseasesConnectionFacetsInput
    $sortBy: TargetDiseasesConnectionSortByInput
    $search: String
  ) {
    efo {
      nodes {
        id
        name
        parentIds
      }
      therapeuticAreas
    }
    target(ensgId: $ensgId) {
      id
      diseasesConnection(
        first: $first
        after: $after
        facets: $facets
        sortBy: $sortBy
        search: $search
      ) {
        totalCount
        pageInfo {
          nextCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
          }
          score
          scoresByDataType {
            dataTypeId
            score
          }
        }
        facets {
          ${facets
            .filter(f => f.facetQuery)
            .map(
              s => `...targetDiseasesConnection${_.upperFirst(s.id)}Fragment`
            )
            .join('\n')}
        }
      }
    }
  }
  ${facets
    .filter(s => s.facetQuery)
    .map(s => print(s.facetQuery))
    .join('\n')}
`;

const facetsStateDefault = facets.reduce((acc, f) => {
  acc[f.id] = f.stateDefault;
  return acc;
}, {});

const ClassicAssociations = ({ ensgId, symbol }) => {
  const [first, setFirst] = useState(50);
  const [page, setPage] = useState(0);
  const [pageCursors, setPageCursors] = useState({});
  const [facetsState, setFacetsState] = useState(facetsStateDefault);
  const [search, setSearch] = useState('');
  const [searchDebouced, setSearchDebouced] = useState('');
  const [sortBy, setSortBy] = useState({
    field: 'SCORE_OVERALL',
    ascending: false,
  });
  const [tab, setTab] = useState('table');

  const handlePaginationChange = (forward, nextPageCursor) => {
    if (forward) {
      // go to next page
      setPage(page + 1);
      setPageCursors({ ...pageCursors, [page + 1]: nextPageCursor });
    } else {
      // go to previous page
      setPage(page - 1);
    }
  };
  const handleSortByChange = sortBy => {
    setSortBy(sortBy);
    setPage(0);
  };
  const handleSearchChange = search => {
    setSearch(search);
    handleSearchDeboucedChange(search);
  };
  const handleSearchDeboucedChange = _.debounce(searchDebouced => {
    setSearchDebouced(searchDebouced);
    setPage(0);
  }, 500);
  const handleFacetChange = facetId => state => {
    setFacetsState({ ...facetsState, [facetId]: state });
    setPage(0);
  };
  const handleTabChange = (event, tab) => {
    if (tab === 'table') {
      // Heatmap table renders 50 rows.
      setTab(tab);
      setFirst(50);
      setPage(0);
    } else {
      // Bubbles and dag render top 10000 by association score descending
      // as there's no way to sort by columns. Facet should still work.
      setTab(tab);
      setFirst(10000);
      setPage(0);
      setSortBy({ field: 'SCORE_OVERALL', ascending: false });
    }
  };

  const facetsInput = facets
    .map(f => ({ ...f, input: f.stateToInput(facetsState[f.id]) }))
    .filter(f => f.input)
    .reduce((acc, f) => {
      acc[f.id] = f.input;
      return acc;
    }, {});
  const after = page > 0 ? pageCursors[page] : null;

  const { loading, error, data } = useQuery(associationsQuery, {
    variables: {
      ensgId,
      sortBy,
      search: searchDebouced ? searchDebouced : null,
      facets: facetsInput,
      first,
      after,
    },
  });

  if (error) return null;

  let edges;
  let totalCount;
  let facetsData;
  let pageInfo;
  let efo;
  if (
    loading &&
    !(data && data.efo && data.target && data.target.diseasesConnection)
  ) {
    edges = [];
    efo = { nodes: [], therapeuticAreas: [] };
  } else {
    edges = data.target.diseasesConnection.edges;
    totalCount = data.target.diseasesConnection.totalCount;
    facetsData = data.target.diseasesConnection.facets;
    pageInfo = data.target.diseasesConnection.pageInfo;
    efo = data.efo;
  }

  const rows = edges.map(({ node, ...rest }) => ({
    disease: node,
    data: {
      name: node.name,
      id: node.id,
      target: { ensgId },
      score: rest.score,
    }, // for tooltip
    ...rest,
  }));
  const dataTypes =
    rows.length > 0 ? rows[0].scoresByDataType.map(d => d.dataTypeId) : [];

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>{commaSeparate(totalCount)} diseases</strong> associated with{' '}
          <strong>{symbol}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card elevation={0}>
          <CardContent>
            <Typography variant="h6">Filter by</Typography>
            <div style={{ paddingTop: '8px', paddingBottom: '4px' }}>
              <TextField
                id="associations-search"
                label="Disease Name"
                value={search}
                onChange={event => handleSearchChange(event.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            {facetsData
              ? facets.map(f => (
                  <FacetContainer key={f.id} name={f.name}>
                    <f.FacetComponent
                      state={facetsState[f.id]}
                      data={facetsData[f.id]}
                      onFacetChange={handleFacetChange(f.id)}
                    />
                  </FacetContainer>
                ))
              : null}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={9}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="table" label="Table" />
          <Tab value="bubbles" label="Bubbles" />
          <Tab value="dag" label="Graph" />
        </Tabs>
        <Card elevation={0}>
          <CardContent>
            {/* table view */}
            {tab === 'table' && (
              <ClassicAssociationsTable
                ensgId={ensgId}
                symbol={symbol}
                rows={rows}
                dataTypes={dataTypes}
                search={search}
                facets={facetsInput}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
                page={page}
                rowsPerPage={first}
                totalCount={totalCount}
                pageInfo={pageInfo}
                onPaginationChange={handlePaginationChange}
              />
            )}

            {/* bubbles view */}
            {tab === 'bubbles' && (
              <ClassicAssociationsBubbles
                ensgId={ensgId}
                symbol={symbol}
                data={rows}
                efo={efo}
                selectedTherapeuticAreas={facetsState.therapeuticArea} // hack!
              />
            )}

            {/* dag view */}
            {tab === 'dag' && (
              <ClassicAssociationsDAG
                ensgId={ensgId}
                symbol={symbol}
                data={rows}
                efo={efo}
                selectedTherapeuticAreas={facetsState.therapeuticArea} // hack!
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ClassicAssociations;
