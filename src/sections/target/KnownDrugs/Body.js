import React from 'react';
import { loader } from 'graphql.macro';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';

const KNOWN_DRUGS_BODY_QUERY = loader('./KnownDrugsQuery.gql');

function Body({ definition, id: ensgId, label: symbol }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="target"
      variables={{ ensgId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description symbol={symbol} />}
      columnsToShow={['drug', 'disease', 'clinicalTrials']}
      stickyColumn="drug"
    />
  );
}

export default Body;
