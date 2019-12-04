import React, { Fragment } from 'react';

import { Link, OtTableRF, DataDownloader } from 'ot-ui';

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

const Section = ({ data, name }) => (
  <Fragment>
    <DataDownloader
      tableHeaders={columns}
      rows={data.rows}
      fileStem={`${name}-targets`}
    />
    <OtTableRF
      loading={false}
      error={false}
      columns={columns}
      data={data.rows}
    />
  </Fragment>
);

export default Section;
