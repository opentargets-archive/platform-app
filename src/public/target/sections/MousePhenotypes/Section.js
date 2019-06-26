import React, { Fragment } from 'react';

import PhenotypesTable from './custom/PhenotypesTable';
import AssociationSummary from '../../../common/AssociationSummary';

const Section = ({ ensgId, symbol, data }) => (
  <Fragment>
    <AssociationSummary data={data.categories} />
    <PhenotypesTable rows={data.rows} symbol={symbol} />
  </Fragment>
);

export default Section;
