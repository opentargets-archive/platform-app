import React from 'react';
import { loader } from 'graphql.macro';

import { Body as Bibliography } from '../../common/Literature';

const DRUGS_LITERATURE_OCURRENCES = loader('./BibliographyQuery.gql');

function Body({ definition, id, label: name }) {
  return (
    <Bibliography
      definition={definition}
      entity="drug"
      id={id}
      name={name}
      BODY_QUERY={DRUGS_LITERATURE_OCURRENCES}
    />
  );
}

export default Body;
