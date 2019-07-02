import React from 'react';

const Summary = ({ isTherapeuticArea, isLeaf }) => (
  <React.Fragment>
    {isTherapeuticArea ? 'therapeutic area • ' : ''}
    {isLeaf ? 'no children' : 'has children'}
  </React.Fragment>
);

export default Summary;
