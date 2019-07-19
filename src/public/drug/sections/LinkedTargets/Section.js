import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'symbol',
    label: 'Symbol',
    renderCell: d => <Link to={`/target/${d.id}`}>{d.symbol}</Link>,
  },
  {
    id: 'id',
    label: 'Ensembl ID',
    renderCell: d => (
      <Link
        external
        to={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${
          d.id
        }`}
      >
        {d.id}
      </Link>
    ),
  },
];

const Section = ({ data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
