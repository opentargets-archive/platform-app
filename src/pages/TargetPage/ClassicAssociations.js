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
  makeStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';

import Link from '../../components/Link';

import ClassicAssociationsDAG from './ClassicAssociationsDAG';
import ClassicAssociationsBubbles from './ClassicAssociationsBubbles';
import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import Wrapper from './Wrapper';
import NavIcon from '../../assets/PediatricDataCancer-MenuBar-Icon.svg'

const TARGET_FACETS_QUERY = loader('./TargetFacets.gql');
const useStyles = makeStyles(theme => ({
  PCDNBox: {
    backgroundColor: '#5CA300', 
    minWidth: '289px',
    height: '31px', 
    display: 'inline-block', 
    fontFamily: 'Inter', 
    padding: '0px 13px'
  },
  PCDNText: {
    fontSize: '16px', 
    color: 'white', 
    paddingLeft: '8px', 
    position: 'relative', 
    top: '-1px'
  },
  desPCDNText: {
    fontSize: '16px',
    marginRight: '11px',
  },
}))

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
 
  const classes = useStyles()
  const PCDNUrl = '/pediatric-cancer-data-navigation';

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
        <Typography variant='h6' align='right'>
          {data ? (
            <>
              <span className={classes.desPCDNText} desPCDNText>Additional pediatric cancer data may be found at:</span>
              <div className={classes.PCDNBox}>
                <Link to={{
                  pathname: {PCDNUrl},
                  state: {
                    entity: 'target',
                    'geneSymbol': symbol
                  }
                }}>
                  <img src={NavIcon} width="15px" height="15px" alt={"Navigation Icon"}/>
                  <span className={classes.PCDNText}>Pediatric Cancer Data Navigation</span>
                </Link> {' '}
              </div>
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
