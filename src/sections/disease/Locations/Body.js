import React from 'react';
import { gql, useQuery } from '@apollo/client';
import _ from 'lodash';

import Description from './Description';
import { DataTable, TableDrawer } from '../../../components/Table';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { naLabel } from '../../../constants';

import Anatomogram from '@ebi-gene-expression-group/anatomogram';

const LOCATIONS_BODY_QUERY = gql`
  query LocationsQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
      indirectLocations {
        id
        name
      }
      directLocations {
        id
        name
      }
    }
  }
`;

function Body({ definition, label: name, id: efoId }) {
  const request = useQuery(LOCATIONS_BODY_QUERY, {
    variables: {
      efoId,
    },
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={data => {
        const locations = data.disease.directLocations
          .map(l => l.id)
          .concat(data.disease.indirectLocations.map(l => l.id));
        console.log(data.disease.directLocations);
        console.log(data.disease.indirectLocations);
        console.log(locations);
        return (
          <div className="bob" style={{ maxWidth: '400px' }}>
            <Anatomogram
              species="homo_sapiens"
              atlasUrl={``}
              highlightIds={locations}
            />
          </div>
        );
      }}
    />
  );
}

export default Body;
