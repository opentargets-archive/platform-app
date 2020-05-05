import React from 'react';

import FilterTable from './custom/FilterTable';

const Section = ({ ensgId, symbol, data }) => (
  <FilterTable symbol={symbol} ensgId={ensgId} />
);

export default Section;
