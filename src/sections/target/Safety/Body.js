import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';
import SafetyTable from './SafetyTable';

const SAFETY_QUERY = loader('./Safety.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(SAFETY_QUERY, { variables: { ensemblId } });
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => (
        <SafetyTable safetyLiabilities={data.target.safetyLiabilities} />
      )}
    />
  );
}

export default Body;
