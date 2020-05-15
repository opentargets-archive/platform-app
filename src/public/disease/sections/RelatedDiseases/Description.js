import React from 'react';

const Description = ({ name }) => (
  <React.Fragment>
    Diseases related to{' '}
    <strong>
      {name} {String.fromCodePoint('9398')}
    </strong>{' '}
    based on shared target associations.
  </React.Fragment>
);

export default Description;
