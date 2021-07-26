import React from 'react';
import { loader } from 'graphql.macro';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';

const KNOWN_DRUGS_BODY_QUERY = loader('./KnownDrugsQuery.gql');

function Body({ definition, id: efoId, label: name }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="disease"
      variables={{ efoId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description name={name} />}
      columnsToShow={['disease', 'drug', 'target', 'clinicalTrials']}
      stickyColumn="drug"
    />
  );
}

export default Body;
