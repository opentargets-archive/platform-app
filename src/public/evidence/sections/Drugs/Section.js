import React from 'react';

import FilterTable from '../../../common/sections/KnownDrugs/custom/FilterTable';

const Section = ({ ensgId, efoId, data }) => (
  <FilterTable rows={data.rows} fileStem={`${ensgId}-${efoId}-known-drugs`} />
);

export default Section;
