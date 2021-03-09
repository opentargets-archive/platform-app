import React from 'react';

import DataDownloader from '../../../components/DataDownloader';
import FilteringOtTableRF from '../../../components/FilteringOtTableRF';
import Link from '../../../components/Link';

const OverviewTab = ({ symbol, lowLevelPathways }) => (
  <>
    <DataDownloader
      tableHeaders={columns}
      rows={lowLevelPathways}
      fileStem={`${symbol}-pathways`}
    />
    <FilteringOtTableRF
      loading={false}
      error={null}
      columns={columns}
      data={lowLevelPathways}
    />
  </>
);

const columns = [
  {
    id: 'name',
    label: 'Pathway',
    filterable: true,
  },
  {
    id: 'id',
    label: 'Pathway ID',
    renderCell: d => (
      <Link external to={`https://reactome.org/content/detail/${d.id}`}>
        {d.id}
      </Link>
    ),
    filterable: true,
  },
  {
    id: 'parentNames',
    label: 'Top-level parent pathway',
    renderCell: d => (
      <React.Fragment>
        {d.parents.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <br /> : null}
            {p.name}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    filterable: true,
    dropdownFilterValue: row => row.parents.map(parent => parent.name),
  },
  {
    id: 'url',
    label: 'View target and pathway',
    renderCell: ({ url }) => (
      <Link external to={url}>
        Link
      </Link>
    ),
  },
];

export default OverviewTab;
