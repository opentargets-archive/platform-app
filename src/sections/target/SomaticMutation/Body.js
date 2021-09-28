import React from 'react';
import { loader } from 'graphql.macro';

import { Body as SomaticMutationBody} from '../../common/SomaticMutation';
import Description from './Description';

const SOMATIC_MUTATION_QUERY = loader('./SomaticMutationQuery.gql');

function Body({ definition, id, label }) {
  const variables = { ensemblId: id };
  return (
    <SomaticMutationBody 
      definition={definition}
      id={id}
      label={label}
      entity="target"
      variables={variables}
      BODY_QUERY={SOMATIC_MUTATION_QUERY}
      Description={Description}
    />
  );
}

export default Body;
