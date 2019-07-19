import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'name',
    label: 'Name',
    renderCell: d => <Link to={`/disease/${d.id}`}>{d.name}</Link>,
  },
  {
    id: 'id',
    label: 'EFO ID',
    renderCell: d => (
      <Link external to={`http://www.ebi.ac.uk/efo/${d.id}`}>
        {d.id}
      </Link>
    ),
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
