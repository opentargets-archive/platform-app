import React from 'react';
import _ from 'lodash';

const Summary = ({ data }) => {
  const prefixCounts = _.countBy(data, row => row.term.substring(0, 1));

  return (
    <React.Fragment>
      {data.length} terms in total
      <br />
      {prefixCounts['F']} MF • {prefixCounts['P']} BP • {prefixCounts['C']} CC
    </React.Fragment>
  );
};

export default Summary;
