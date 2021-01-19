import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';

const DISEASE_FACETS_QUERY = gql`
  query DiseaseFacetsQuery(
    $efoId: String!
    $aggregationFilters: [AggregationFilter!]
  ) {
    disease(efoId: $efoId) {
      id
      name
      associatedTargets(aggregationFilters: $aggregationFilters) {
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

function ClassicAssociations({ efoId, name }) {
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const { loading, data } = useQuery(DISEASE_FACETS_QUERY, {
    variables: { efoId, aggregationFilters },
  });

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
  };

  const facetData = data?.disease?.associatedTargets.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12}>
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
