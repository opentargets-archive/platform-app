import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { Skeleton } from '@material-ui/lab';

import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import Wrapper from './Wrapper';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery(
    $ensemblId: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    target(ensemblId: $ensemblId) {
      id
      approvedName
      associatedDiseases(aggregationFilters: $aggregationFilters) {
        count
        aggregations {
          uniques
          aggs {
            name
            uniques
            rows {
              key
              uniques
              aggs {
                key
                uniques
              }
            }
          }
        }
      }
    }
  }
`;

function ClassicAssociations({ ensgId, symbol }) {
  const match = useRouteMatch();
  const location = useLocation();
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const { loading, data, refetch } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    variables: { ensemblId: ensgId, aggregationFilters },
  });

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
    refetch();
  };

  const facetData = data?.target?.associatedDiseases.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>
                {data.target.associatedDiseases.count} diseases or phenotypes
              </strong>{' '}
              associated with <strong>{symbol}</strong>
            </>
          ) : (
            <strong>Loading...</strong>
          )}
        </Typography>
      </Grid>{' '}
      <Grid item xs={12} lg={3}>
        <Card elevation={0}>
          <CardContent>
            <Facets
              loading={loading}
              data={facetData}
              onChange={handleChangeFilters}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Tabs value={location.pathname}>
          <Tab
            component={Link}
            value={match.url}
            label="Table"
            to={match.url}
          />
          <Tab
            component={Link}
            value={`${match.url}/bubbles`}
            label="Bubbles"
            to={`${match.url}/bubbles`}
          />
          <Tab
            component={Link}
            value={`${match.url}/graph`}
            label="Graph"
            to={`${match.url}/graph`}
          />
        </Tabs>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            {loading && !data ? (
              <Skeleton variant="rect" height="40vh" />
            ) : (
              <Switch>
                <Route path={`${match.path}/bubbles`}>
                  <Wrapper
                    ensemblId={ensgId}
                    symbol={symbol}
                    Component={ClassicAssociationsBubbles}
                    aggregationFilters={aggregationFilters}
                  />
                </Route>
                <Route path={`${match.path}/graph`}>
                  <Wrapper
                    ensemblId={ensgId}
                    symbol={symbol}
                    Component={ClassicAssociationsDAG}
                    aggregationFilters={aggregationFilters}
                  />
                </Route>
                <Route path={match.path}>
                  <ClassicAssociationsTable
                    ensgId={ensgId}
                    aggregationFilters={aggregationFilters}
                  />
                </Route>
              </Switch>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
