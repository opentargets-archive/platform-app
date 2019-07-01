import React from 'react';

import FilterTable from '../../../common/sections/KnownDrugs/custom/FilterTable';

const Section = ({ symbol, data }) => (
  <FilterTable rows={data.rows} fileStem={`${symbol}-known-drugs`} />
);

export default Section;
