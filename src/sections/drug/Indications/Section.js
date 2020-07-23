import React from 'react';

import { Link } from 'ot-ui';

import Table, { PaginationActionsComplete } from '../../../components/Table';
import TherapeuticAreasDrawer from './Custom/TherapeuticAreasDrawer';

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

const Section = ({ chemblId, data }) => (
  <Table
    columns={columns}
    dataDownloader
    dataDownloaderFileStem={`${chemblId}-indications`}
    pagination={PaginationActionsComplete}
    rows={data.rows}
    showGlobalFilter
    sortBy="maxPhaseForIndication"
    order="desc"
  />
);

export default Section;
