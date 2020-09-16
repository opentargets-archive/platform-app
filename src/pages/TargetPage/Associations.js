import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import * as d3 from 'd3';
import _ from 'lodash';
import gql from 'graphql-tag';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

import { commaSeparate } from 'ot-ui';

import AssociationsTable from './AssociationsTable';
import { AssociationsEvidenceTable } from '../../components/Associations';
import { client3 } from '../../client';

const TARGET_ASSOCIATIONS_QUERY = gql`
  query TargetAssociationsQuery(
    $ensgId: String!
    $indirects: Boolean!
    $harmonicOptions: HarmonicInput
    $page: Pagination
  ) {
    associationsByTargetId(
      targetId: $ensgId
      indirects: $indirects
      harmonicOptions: $harmonicOptions
      page: $page
    ) {
      metadata {
        options {
          maxVectorElements
          pExponent
          reduceFunc
        }
        dsOptions {
          id
          weight
          reduceFunc
        }
      }
      rows {
        obj {
          id
          name
        }
        score
        dsScores
        evsCount
      }
    }
  }
`;

// TODO: when api returns total, use smaller page size
const page = { index: 0, size: 10000 };

const TargetAssociationsPage = ({ ensgId, symbol }) => {
  const [indirects, setIndirects] = useState(true);
  const [dataSourcesState, setDataSourcesState] = useState({
    dataSources: [],
    options: null,
  });
  const [evidence, setEvidence] = useState(null);

  const handleIndirectsChange = indirects => {
    setIndirects(indirects);
  };
  const handleDataSourcesChange = ({ dataSources, options }) => {
    setDataSourcesState({ dataSources, options });
  };
  const handleCellClick = ({ efoId, name, dataSourceId }) => {
    if (
      evidence &&
      evidence.efoId === efoId &&
      evidence.dataSourceId === dataSourceId
    ) {
      // clear
      setEvidence(null);
    } else {
      // set
      const newEvidence = { efoId, name, dataSourceId };
      setEvidence(newEvidence);
    }
  };

  const { dataSources, options } = dataSourcesState;

  // have to strip __typename when using as input (__typename added by apollo cache)
  const dsOptions = dataSources
    .map(({ id, weight, reduceFunc }) => ({
      id,
      weight,
      reduceFunc,
    }))
    .sort((a, b) => d3.ascending(a.id, b.id)); // must be in ascending order for query (!)
  const { __typename, ...optionsMinusTypename } = options || {};
  const harmonicOptions =
    dsOptions.length > 0 && options
      ? { dsOptions, options: optionsMinusTypename }
      : null;

  // query variables
  let variables = harmonicOptions
    ? { ensgId, indirects, harmonicOptions, page }
    : { ensgId, indirects, page };

  const { data } = useQuery(TARGET_ASSOCIATIONS_QUERY, {
    client: client3,
    variables,
  });

  const rows =
    (data && data.associationsByTargetId && data.associationsByTargetId.rows) ||
    [];
  const metadata =
    (data &&
      data.associationsByTargetId &&
      data.associationsByTargetId.metadata) ||
    {};

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card elevation={0}>
          <CardHeader
            title="Associations"
            subheader={
              <React.Fragment>
                <strong>{commaSeparate(rows.length)}</strong> diseases
                associated with <strong>{symbol}</strong>
              </React.Fragment>
            }
          />
          <CardContent>
            <AssociationsTable
              {...{
                rows,
                indirects,
                dataSources,
                options,
                metadata,
                evidence,
              }}
              onIndirectsChange={handleIndirectsChange}
              onDataSourcesChange={handleDataSourcesChange}
              onCellClick={handleCellClick}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={0}>
          <CardHeader
            title="Evidence"
            subheader={
              evidence ? (
                <React.Fragment>
                  Showing evidence between <strong>{symbol}</strong> and{' '}
                  <strong>{evidence.name}</strong> from{' '}
                  <strong>
                    {_.startCase(evidence.dataSourceId.split('__')[1])}
                  </strong>
                </React.Fragment>
              ) : (
                'Click a cell to see the evidence behind it'
              )
            }
          />
          {evidence ? (
            <CardContent>
              <AssociationsEvidenceTable
                ensgId={ensgId}
                efoId={evidence.efoId}
                dataSourceId={evidence.dataSourceId}
                indirects={indirects}
              />
            </CardContent>
          ) : null}
        </Card>
      </Grid>
    </Grid>
  );
};

export default TargetAssociationsPage;
