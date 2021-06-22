import React from 'react';
import { loader } from 'graphql.macro';

import { Body as Bibliography } from '../../common/Literature';

const TARGET_LITERATURE_OCURRENCES = loader('./SimilarEntities.gql');

function Body({ definition, id, label: name }) {
  return (
    <Bibliography
      definition={definition}
      entity="target"
      id={id}
      name={name}
      BODY_QUERY={TARGET_LITERATURE_OCURRENCES}
    />
  );
}

export default Body;
