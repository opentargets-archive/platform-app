import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { betaClient } from '../../../client';
import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';

const CLINGEN_QUERY = gql`
  query ClingenQuery($ensemblId: String!, $efoId: String!) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["clingen"]
      ) {
        count
        rows {
          recordId
        }
      }
    }
  }
`;

function Body(props) {
  const { definition, id, label } = props;
  console.log('props', props);
  console.log('definition', definition);
  const { ensgId: ensemblId, efoId } = id;
  const request = useQuery(CLINGEN_QUERY, {
    variables: { ensemblId, efoId },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={data => {
        return 'clingen';
      }}
    />
  );
}

export default Body;
