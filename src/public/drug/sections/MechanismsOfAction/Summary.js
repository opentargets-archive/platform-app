import React from 'react';

const Summary = ({ uniqueActionTypes, uniqueTargetTypes }) => (
  <>
    {uniqueActionTypes.length > 0 ? uniqueActionTypes.join(' • ') : null}
    <br />
    {uniqueTargetTypes.length > 0 ? uniqueTargetTypes.join(' • ') : null}
  </>
);

export default Summary;
