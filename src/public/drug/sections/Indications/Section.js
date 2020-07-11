import React from 'react';

import { Link } from 'ot-ui';

import DataTable from '../../../common/Table/DataTable';
import TherapeuticAreasDrawer from './Custom/TherapeuticAreasDrawer';
import { label } from '../../../../utils/global';
import { PaginationActionsComplete } from '../../../common/Table/TablePaginationActions';

const columns = [
  {
    id: 'indication',
    propertyPath: 'disease.name',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{label(d.disease.name)}</Link>
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
  <DataTable
    columns={columns}
    dataDownloader
    dataDownloaderFileStem={`${chemblId}-indications`}
    rows={data.rows}
    showGlobalFilter
    sortBy="maxPhaseForIndication"
    order="desc"
    ActionsComponent={PaginationActionsComplete}
  />
);

export default Section;
