import React from 'react';
import _ from 'lodash';

const Summary = ({ data }) => {
  const hallmarks = _.uniqBy(data.rows, 'label');
  const promote = _.uniqBy(data.rows.filter(d => d.promote), 'label');
  const suppress = _.uniqBy(data.rows.filter(d => d.suppress), 'label');
  return (
    <React.Fragment>
      {hallmarks.length} hallmarks
      <br />
      {promote.length} promote • {suppress.length} suppress
    </React.Fragment>
  );
};

export default Summary;
