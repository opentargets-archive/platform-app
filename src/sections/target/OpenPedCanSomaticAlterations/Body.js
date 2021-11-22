import React from 'react';
import { loader } from 'graphql.macro';

import { Body as OpenPedCanSomaticAlterationsBody} from '../../common/OpenPedCanSomaticAlterations';
import Description from './Description';

const SOMATIC_ALTERATIONS_QUERY = loader('./SomaticAlterationsQuery.gql');

function Body({ definition, id, label: symbol}) {
  const variables = { ensemblId: id };
  const dataDownloaderFileStem = `OpenPedCanSomaticAlterations-${id}`
  return (
    <OpenPedCanSomaticAlterationsBody 
      definition={definition}
      id={id}
      label={{symbol}}
      entity="target"
      variables={variables}
      BODY_QUERY={SOMATIC_ALTERATIONS_QUERY}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}

    />
  );
}

export default Body;
