import React from 'react';
import Typography from '@material-ui/core/Typography';

import FilterTable from '../../common/KnownDrugs/custom/FilterTable';

const Section = ({ ensgId, efoId, data }) => (
  <React.Fragment>
    <Typography>
      Evidence from <strong>ChEMBL</strong>.
    </Typography>
    <FilterTable rows={data.rows} fileStem={`${ensgId}-${efoId}-known-drugs`} />
  </React.Fragment>
);

export default Section;
