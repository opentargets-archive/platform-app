import { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import client from '../../../client';

const DISEASE_SUMMARY_QUERY = loader('./summaryQuery.gql');

const Summary = ({ efoId }) => {
  const [data, setData] = useState(null);

  useEffect(
    () => {
      let isCurrent = true;
      // The GraphQL schema for the disease ontology data does not follow the
      // assumptions made in the UI code to query for the section data.
      // Hence, making the call for the data in this way.
      client
        .query({
          query: DISEASE_SUMMARY_QUERY,
          variables: {
            efoId,
          },
        })
        .then(res => {
          if (isCurrent) {
            setData(res.data.disease);
          }
        });
      return () => {
        isCurrent = false;
      };
    },
    [efoId]
  );

  if (!data) return null;

  return data.isTherapeuticArea
    ? 'Therapeutic area'
    : `Belongs to ${data.therapeuticAreas.length} therapeutic areas`;
};

export default Summary;
