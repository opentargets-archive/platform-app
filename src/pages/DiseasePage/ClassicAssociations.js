import React, { useState } from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import Link from '../../components/Link';
import NavIcon from '../../assets/PediatricDataCancer-MenuBar-Icon.svg'

const DISEASE_FACETS_QUERY = loader('./DiseaseFacets.gql');

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

function ClassicAssociations({ efoId, name }) {
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const { loading, data } = useQuery(DISEASE_FACETS_QUERY, {
    variables: { efoId, aggregationFilters },
  });

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
  };

  const facetData = data?.disease?.associatedTargets.aggregations.aggs;
  const classes = useStyles()
  const PCDNUrl = '/pediatric-cancer-data-navigation';

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>{data.disease.associatedTargets.count} targets</strong>{' '}
              associated with <strong>{data.disease.name}</strong>
            </>
          ) : (
            <strong>Loading...</strong>
          )}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
      <Typography variant='h6' align='right'>
      {data ? (
        <>
          <span className={classes.desPCDNText}>Additional pediatric cancer data may be found at:</span>
          <div className={classes.PCDNBox}>
            <Link to={{
              pathname: PCDNUrl,
              state: {
                entity: 'disease',
                'disease': name
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
              type="target"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            <ClassicAssociationsTable
              efoId={efoId}
              aggregationFilters={aggregationFilters}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
