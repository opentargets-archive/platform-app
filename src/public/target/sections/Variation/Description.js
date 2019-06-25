import React from 'react';

const Description = ({ symbol }) => (
  <React.Fragment>
    Genomic variants associated with <strong>{symbol}</strong>. Only variant
    information associating <strong>{symbol}</strong> with any disease is
    displayed. Click on any variant, gene or transcript to get more information
    about it. Pan or zoom the browser to see neighbouring genes. The number
    above gene variants means that more than 1 overlap the same region at the
    current zoom level. Genomic coordinates are relative to GRCh38.
  </React.Fragment>
);

export default Description;
