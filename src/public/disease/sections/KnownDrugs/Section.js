import React from 'react';

import FilterTable from '../../../common/sections/KnownDrugs/custom/FilterTable';

const Section = ({ efoId, data }) => (
  <FilterTable rows={data.rows} fileStem={`${efoId}-known-drugs`} />
);

export default Section;
