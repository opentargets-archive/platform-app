import React from 'react';
import { loader } from 'graphql.macro';

import { Body as OpenPedCanSomaticAlterationsBody} from '../../common/OpenPedCanSomaticAlterations';
import Description from './Description';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

const SOMATIC_ALTERATIONS_QUERY = loader('./SomaticAlterationsQuery.gql');

function Body({ definition, id, label: symbol}) {
  const summaryRequest = usePlatformApi(Summary.fragments.targetSomaticAlterationsSummary)
  
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
      summaryRequest={summaryRequest}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}

    />
  );
}

export default Body;
