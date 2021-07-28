import React from 'react';
import { loader } from 'graphql.macro';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';

const KNOWN_DRUGS_BODY_QUERY = loader('./KnownDrugsQuery.gql');

function Body({ definition, id: chemblId, label: name }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="drug"
      variables={{ chemblId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description name={name} />}
      columnsToShow={['disease', 'target', 'clinicalTrials']}
      stickyColumn="disease"
    />
  );
}

export default Body;
