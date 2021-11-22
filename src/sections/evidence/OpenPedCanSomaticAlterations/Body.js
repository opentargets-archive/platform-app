import React from 'react';
import { loader } from 'graphql.macro';

import { Body as OpenPedCanSomaticAlterationsBody } from '../../common/OpenPedCanSomaticAlterations';
import Description from './Description';

const SOMATIC_ALTERATIONS_QUERY = loader('./SomaticAlterationsQuery.gql');

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const variables = { ensemblId, efoId }
  const dataDownloaderFileStem = `OpenPedCanSomaticAlterations-${ensemblId}-${efoId}`
  return (
    <OpenPedCanSomaticAlterationsBody 
      definition={definition}
      id={id}
      label={label}
      entity="evidence"
      variables={variables}
      BODY_QUERY={SOMATIC_ALTERATIONS_QUERY}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}
    />
  );
}

export default Body;
