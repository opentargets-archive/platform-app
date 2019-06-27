import React from 'react';

import FilterTable from './custom/FilterTable';

const Section = ({ ensgId, symbol, data }) => (
  <FilterTable rows={data.rows} symbol={symbol} />
);

export default Section;
