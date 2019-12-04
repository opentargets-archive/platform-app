import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'symbol',
    label: 'Symbol',
    renderCell: d => <Link to={`/target/${d.id}`}>{d.symbol}</Link>,
    width: '20%',
  },
  {
    id: 'name',
    label: 'Name',
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
