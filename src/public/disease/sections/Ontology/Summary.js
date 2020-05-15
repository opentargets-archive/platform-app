import React, { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import client from '../../../client';

const DISEASE_SUMMARY_QUERY = loader('./summaryQuery.gql');

const Summary = ({ efoId }) => {
  const [data, setData] = useState(null);

  useEffect(
    () => {
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
          setData(res.data.disease);
        });
    },
    [efoId]
  );

  if (!data) return null;

  return (
    <>
      {data.isTherapeuticArea ? 'therapeutic area • ' : ''}
      {data.children.length > 0 ? 'has children' : 'no children'}
    </>
  );
};

export default Summary;
