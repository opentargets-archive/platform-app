import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'symbol',
    label: 'Symbol',
    renderCell: d => <Link to={`/target/${d.id}`}>{d.symbol}</Link>,
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
