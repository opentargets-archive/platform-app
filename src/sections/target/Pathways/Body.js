import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Description from './Description';
import PathwaysTable from './PathwaysTable';
import SectionItem from '../../../components/Section/SectionItem';

const PATHWAYS_QUERY = loader('./Pathways.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(PATHWAYS_QUERY, {
    variables: { ensemblId },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target }) => {
        return (
          <PathwaysTable
            symbol={target.approvedSymbol}
            pathways={target.pathways}
          />
        );
      }}
    />
  );
}

export default Body;
