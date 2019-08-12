import React from 'react';

const Summary = ({ uniqueActionTypes, uniqueTargetTypes }) => (
  <React.Fragment>
    {uniqueActionTypes.length > 0 ? uniqueActionTypes.join(' • ') : null}
    <br />
    {uniqueTargetTypes.length > 0 ? uniqueTargetTypes.join(' • ') : null}
  </React.Fragment>
);

export default Summary;
