import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'pathway.id',
    label: 'Pathway',
    renderCell: d => (
      <Link
        external
        to={`https://reactome.org/PathwayBrowser/#${d.pathway.id}`}
      >
        {d.pathway.name}
      </Link>
    ),
  },
  {
    id: 'activity',
    label: 'Activity',
  },
  {
    id: 'mutations',
    label: 'Mutations',
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
