import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import { sourceMap, phaseMap } from '../../../constants';
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

const INDICATIONS_QUERY = loader('./IndicationsQuery.gql');

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
    renderCell: ({ maxPhaseForIndication }) => phaseMap[maxPhaseForIndication],
    filterValue: ({ maxPhaseForIndication }) => phaseMap[maxPhaseForIndication],
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
  const variables = { chemblId };
  const request = useQuery(INDICATIONS_QUERY, { variables });

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
            query={INDICATIONS_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
