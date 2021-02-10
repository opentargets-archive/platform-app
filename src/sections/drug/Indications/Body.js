import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { sourceMap } from '../../../constants';
import { referenceUrls } from '../../../utils/urls';
import {
  DataTable,
  PaginationActionsComplete,
  TableDrawer,
} from '../../../components/Table';
import Description from './Description';
import Link from '../../../components/Link';
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
          references {
            ids
            source
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
    width: '38%',
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
    width: '38%',
  },
  {
    id: 'maxPhaseForIndication',
    label: 'Max Phase',
    sortable: true,
    width: '10%',
  },
  {
    id: 'references',
    label: 'Source',
    renderCell: ({ references }) => {
      if (!references) return 'N/A';

      const referenceList = [];

      references.forEach(reference => {
        reference.ids.forEach((id, i) => {
          referenceList.push({
            name: id,
            url: referenceUrls[reference.source](id),
            group: sourceMap[reference.source],
          });
        });
      });

      if (referenceList.length === 1) {
        return (
          <Link external to={referenceList[0].url}>
            {referenceList[0].group}
          </Link>
        );
      }

      return <TableDrawer entries={referenceList} />;
    },
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
