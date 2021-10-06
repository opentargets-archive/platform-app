import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import PhenotypesTable from './PhenotypesTable';

const MOUSE_PHENOTYPES_QUERY = loader('./MousePhenotypes.gql');

function Body({ definition, id, label: symbol }) {
  const request = useQuery(MOUSE_PHENOTYPES_QUERY, {
    variables: { ensemblId: id },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target }) => {
        return <PhenotypesTable mousePhenotypes={target.mousePhenotypes} />;
      }}
    />
  );
}

export default Body;
