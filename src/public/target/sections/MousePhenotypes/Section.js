import React, { Fragment } from 'react';

import PhenotypesTable from './custom/PhenotypesTable';

const Section = ({ ensgId, symbol, data }) => (
  <Fragment>
    <PhenotypesTable data={data} symbol={symbol} />
  </Fragment>
);

export default Section;
