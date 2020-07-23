import React from 'react';

const Summary = ({ data }) => {
  const { uniqueActionTypes, uniqueTargetTypes } = data;
  return (
    <>
      {uniqueActionTypes.length > 0 ? uniqueActionTypes.join(' • ') : null}
      <br />
      {uniqueTargetTypes.length > 0 ? uniqueTargetTypes.join(' • ') : null}
    </>
  );
};

export default Summary;
