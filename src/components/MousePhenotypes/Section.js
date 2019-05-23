import React, { Fragment } from 'react';

import PhenotypesTable from './PhenotypesTable';
import AssociationSummary from '../AssociationSummary';

const Section = ({ ensgId, symbol, data }) => (
  <Fragment>
    <AssociationSummary data={data.categories} />
    <PhenotypesTable rows={data.rows} symbol={symbol} />
  </Fragment>
);

export default Section;
