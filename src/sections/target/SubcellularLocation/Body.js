import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import SubcellularViz from './SubcellularViz';

const SUBCELLULAR_LOCATION_QUERY = loader('./SubcellularLocation.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(SUBCELLULAR_LOCATION_QUERY, {
    variables: { ensemblId },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target }) => {
        return (
          <>
            <SubcellularViz data={target} />
          </>
        );
      }}
    />
  );
}

export default Body;
