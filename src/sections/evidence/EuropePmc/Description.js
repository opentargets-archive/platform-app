import React from 'react';

function Description({ target, disease }) {
  return (
    <>
      Articles where {target} and {disease} are found in the same sentence.
    </>
  );
}

export default Description;
