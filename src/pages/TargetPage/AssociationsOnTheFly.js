import React, { useEffect, useState } from 'react';
import { loader } from 'graphql.macro';

import client from '../../client';

const DATASOURCES_QUERY = loader('./Datasources.gql');
const ASSOCS_ON_THE_FLY_QUERY = loader('./AssocsOnTheFly.gql');

function AssociationsOnTheFly({ ensemblId }) {
  const [datasources, setDatasources] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(
    () => {
      const promises = [
        client.query({ query: DATASOURCES_QUERY }),

        client.query({
          query: ASSOCS_ON_THE_FLY_QUERY,
          variables: { ensemblId },
        }),
      ];

      Promise.all(promises).then(([sources, scores]) => {
        setDatasources(sources.data.associationDatasources);
        setRows(scores.data.target.associatedDiseases.rows);
      });
    },
    [ensemblId]
  );

  if (datasources.length === 0 || rows.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          {datasources.map(({ datasource }) => (
            <th key={datasource}>{datasource}</th>
          ))}
        </tr>
        <tr>
          {datasources.map(({ datasource }) => {
            return (
              <th key={datasource}>
                <input type="number" />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody />
    </table>
  );
}

export default AssociationsOnTheFly;
