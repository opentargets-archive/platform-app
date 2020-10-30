import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Link } from 'ot-ui';

import {
  DataTable,
  PaginationActionsComplete,
} from '../../../components/Table';
import Description from './Description';
import SectionItem from '../../../components/Section/SectionItem';
import TherapeuticAreasDrawer from './TherapeuticAreasDrawer';

const INDICATIONS_QUERY = gql`
  query IndicationsQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      indications {
        rows {
          maxPhaseForIndication
          disease {
            id
            name
            therapeuticAreas {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'indication',
    propertyPath: 'disease.name',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
    width: '45%',
  },
  {
    id: 'therapeuticAreas',
    renderCell: d => {
      return (
        <TherapeuticAreasDrawer therapeuticAreas={d.disease.therapeuticAreas} />
      );
    },
    exportValue: d =>
      d.disease.therapeuticAreas.map(therapeuticArea => therapeuticArea.id),
    width: '45%',
  },
  {
    id: 'maxPhaseForIndication',
    label: 'Max Phase',
    numeric: true,
    sortable: true,
    width: '10%',
  },
];

function Body({ definition, id: chemblId, label: name }) {
  const request = useQuery(INDICATIONS_QUERY, { variables: { chemblId } });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description name={name} />}
      renderBody={data => {
        const { rows } = data.drug.indications;

        return (
          <DataTable
            columns={columns}
            dataDownloader
            dataDownloaderFileStem={`${chemblId}-indications`}
            rows={rows}
            showGlobalFilter
            sortBy="maxPhaseForIndication"
            order="desc"
            rowsPerPageOptions={[10, 25, 100]}
            ActionsComponent={PaginationActionsComplete}
          />
        );
      }}
    />
  );
}

export default Body;
