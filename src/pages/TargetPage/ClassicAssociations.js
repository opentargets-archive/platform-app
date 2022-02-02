import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import {
  Switch,
  Route,
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
import { useQuery } from '@apollo/client';

import Link from '../../components/Link';

import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import Wrapper from './Wrapper';

const TARGET_FACETS_QUERY = loader('./TargetFacets.gql');

function ClassicAssociations({ ensgId, symbol }) {
  const match = useRouteMatch();
  const location = useLocation();
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const { loading, data } = useQuery(TARGET_FACETS_QUERY, {
    variables: { ensemblId: ensgId, aggregationFilters },
  });

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
  };

  const facetData = data?.target?.associatedDiseases.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12} md={4}>
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
      <Grid item xs={12} md={8}>
        <Typography variant='h6'>
          {data ? (
            <>
              <span style={{fontSize: '16px'}}>Additional pediatric cancer data may be found by using the search tool on the </span> {' '} 
              <Link to={{
                pathname: "/pediatric-cancer-data-navigation",
                state: {
                  entity: 'target',
                  'geneSymbol': symbol
                }
              }}>
                <span style={{fontSize: '16px'}}><b>Pediatric Cancer Data Navigation</b></span>
              </Link> {' '}
              <span style={{fontSize: '16px'}}>page.</span>
            </>
          ) : (
            <></>
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
              type="disease"
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
