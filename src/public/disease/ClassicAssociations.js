import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { commaSeparate } from 'ot-ui';

import * as facetsObject from './facetIndex';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import FacetContainer from '../common/FacetContainer';

const facets = Object.values(facetsObject);

const associationsQuery = gql`
  query DiseaseAssociationsQuery(
    $efoId: String!
    $first: Int
    $after: String
    $facets: DiseaseTargetsConnectionFacetsInput
    $sortBy: DiseaseTargetsConnectionSortByInput
    $search: String
  ) {
    disease(efoId: $efoId) {
      id
      targetsConnection(
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
            symbol
            name
            details {
              tractability {
                smallMolecule {
                  chemblBucket
                  description
                  value
                }
                antibody {
                  chemblBucket
                  description
                  value
                }
              }
            }
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
              s => `...diseaseTargetsConnection${_.upperFirst(s.id)}Fragment`
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

const getTractabilityScoresByModality = ({ smallMolecule, antibody }) => {
  // arrays come in descending order of importance (which is not
  // the same as field chemblBucket), so use array index in scoring
  // scheme
  const smallMoleculeScore = smallMolecule
    .map((d, i) => (d.value ? Math.pow(2, -(i + 1)) : 0))
    .reduce((acc, d) => acc + d);
  const antibodyScore = antibody
    .map((d, i) => (d.value ? Math.pow(2, -(i + 1)) : 0))
    .reduce((acc, d) => acc + d);
  return [
    {
      modalityId: 'smallMolecule',
      score: smallMoleculeScore,
    },
    {
      modalityId: 'antibody',
      score: antibodyScore,
    },
  ];
};

const ROWS_PER_PAGE = 50;

const ClassicAssociations = ({ efoId, name }) => {
  const [page, setPage] = useState(0);
  const [pageCursors, setPageCursors] = useState({});
  const [sortBy, setSortBy] = useState({
    field: 'SCORE_OVERALL',
    ascending: false,
  });
  const [search, setSearch] = useState('');
  const [searchDebouced, setSearchDebouced] = useState('');
  const [facetsState, setFacetsState] = useState(facetsStateDefault);

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
      efoId,
      sortBy,
      search: searchDebouced ? searchDebouced : null,
      facets: facetsInput,
      after,
    },
  });

  if (error) {
    return null;
  }

  let edges;
  let totalCount;
  let facetsData;
  let pageInfo;
  if (loading && !(data && data.disease && data.disease.targetsConnection)) {
    edges = [];
  } else {
    edges = data.disease.targetsConnection.edges;
    totalCount = data.disease.targetsConnection.totalCount;
    facetsData = data.disease.targetsConnection.facets;
    pageInfo = data.disease.targetsConnection.pageInfo;
  }

  const rows = edges.map(({ node, ...rest }) => ({
    target: node,
    tractabilityScoresByModality: getTractabilityScoresByModality(
      node.details.tractability
    ),
    data: {
      symbol: node.symbol,
      id: node.id,
      disease: { efoId },
      score: rest.score,
    }, // for tooltip
    ...rest,
  }));
  const dataTypes =
    rows.length > 0 ? rows[0].scoresByDataType.map(d => d.dataTypeId) : [];
  const modalities =
    rows.length > 0
      ? rows[0].tractabilityScoresByModality.map(d => d.modalityId)
      : [];

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>{commaSeparate(totalCount)} targets</strong> associated with{' '}
          <strong>{name}</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card elevation={0}>
          <CardContent>
            <Typography variant="h6">Filter by</Typography>
            <div style={{ paddingTop: '8px', paddingBottom: '4px' }}>
              <TextField
                id="associations-search"
                label="Target Symbol"
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
        <Card elevation={0}>
          <CardContent>
            <ClassicAssociationsTable
              efoId={efoId}
              name={name}
              rows={rows}
              dataTypes={dataTypes}
              modalities={modalities}
              search={search}
              facets={facetsInput}
              sortBy={sortBy}
              onSortByChange={handleSortByChange}
              page={page}
              rowsPerPage={ROWS_PER_PAGE}
              totalCount={totalCount}
              pageInfo={pageInfo}
              onPaginationChange={handlePaginationChange}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ClassicAssociations;
