import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import HomologyTableTab from './HomologyTableTab';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const COMP_GENOMICS_QUERY = loader('./CompGenomics.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(COMP_GENOMICS_QUERY, { variables: { ensemblId } });
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => <HomologyTableTab data={data} />}
    />
  );
}

export default Body;
