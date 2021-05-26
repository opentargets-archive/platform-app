import React from 'react';
import { loader } from 'graphql.macro';

import { Body as Bibliography } from '../../common/Literature';

const DISEASE_LITERATURE_OCURRENCES = loader('./BibliographyQuery.gql');

function Body({ definition, id, label: name }) {
  return (
    <Bibliography
      definition={definition}
      entity="disease"
      id={id}
      name={name}
      BODY_QUERY={DISEASE_LITERATURE_OCURRENCES}
    />
  );
}

export default Body;
