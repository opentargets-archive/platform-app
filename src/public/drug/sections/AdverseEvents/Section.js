import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'event',
    label: 'Adverse event',
  },
  {
    id: 'count',
    label: 'Number of reported events',
  },
  {
    id: 'llr',
    label: 'Log likelihood ratio',
  },
];

const Section = ({ data }) => (
  <React.Fragment>
    A list of post-marketing adverse events submitted by healthcare
    professionals to the FDA Adverse Event Reporting System (FAERS). The list
    only contains adverse events with a log likelihood ratio above a critical
    value (CV) threshold - see our{' '}
    <Link to="#">adverse event report documentation page</Link> for more
    information.
    <OtTableRF
      loading={false}
      error={false}
      columns={columns}
      data={data.rows}
    />
  </React.Fragment>
);

export default Section;
