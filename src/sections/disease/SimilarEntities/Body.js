import React from 'react';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';

import Description from './Description';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { naLabel } from '../../../constants';

const SIMILARENTITIES_BODY_QUERY = gql`
  query SimilarEntitiesQuery(
    $efoId: String!
    $ids: [String!] = []
    $threshold: Float = 0.5
    $size: Int! = 15
  ) {
    disease(efoId: $efoId) {
      id
      name

      similarW2VEntities(
        additionalIds: $ids
        threshold: $threshold
        size: $size
      ) {
        score
        object {
          ... on Target {
            id
            approvedSymbol
          }
          ... on Drug {
            id
            name
          }
          ... on Disease {
            id
            name
          }
        }
      }
    }
  }
`;

function Body({ definition, label: name, id: efoId }) {
  const request = useQuery(SIMILARENTITIES_BODY_QUERY, {
    variables: {
      efoId,
    },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={({ disease: { similarW2VEntities } }) => {
        // process the data
        console.log('DATA: ', similarW2VEntities);

        return (
          <>
            {similarW2VEntities
              .map(e => e.object.name || e.object.approvedSymbol)
              .join(', ')}
          </>
        );
      }}
    />
  );

  //  return (<>Hello world</>);
}

export default Body;
