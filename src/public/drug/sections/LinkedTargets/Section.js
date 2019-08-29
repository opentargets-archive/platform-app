import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'symbol',
    label: 'Symbol',
    renderCell: d => (
      <Link component={RouterLink} to={`/target/${d.id}`}>
        {d.symbol}
      </Link>
    ),
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
