import React, { Fragment } from 'react';

const Summary = ({ count }) => (
  <Fragment>
    {count} target{count !== 1 ? 's' : ''}
  </Fragment>
);

export default Summary;
