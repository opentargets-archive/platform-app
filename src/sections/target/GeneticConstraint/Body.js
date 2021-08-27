import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import GeneticConstraintTable from './GeneticConstraintTable';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const GENETIC_CONSTRAINT = loader('./GeneticConstraint.gql');

function Body({ definition, id: ensemblId, label: symbol }) {
  const request = useQuery(GENETIC_CONSTRAINT, { variables: { ensemblId } });
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target }) => (
        <GeneticConstraintTable
          symbol={symbol}
          geneticConstraint={target.geneticConstraint}
        />
      )}
    />
  );
}

export default Body;
