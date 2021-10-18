import React from 'react';
import { loader } from 'graphql.macro';

import { Body as OpenPedCanSomaticMutationsBody } from '../../common/OpenPedCanSomaticMutations';
import Description from './Description';

const SOMATIC_MUTATION_QUERY = loader('./SomaticMutationQuery.gql');

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const variables = { ensemblId, efoId }
  const dataDownloaderFileStem = `OpenPedCanSomaticMutations-${ensemblId}-${efoId}`
  return (
    <OpenPedCanSomaticMutationsBody 
      definition={definition}
      id={id}
      label={label}
      entity="evidence"
      variables={variables}
      BODY_QUERY={SOMATIC_MUTATION_QUERY}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}
    />
  );
}

export default Body;
