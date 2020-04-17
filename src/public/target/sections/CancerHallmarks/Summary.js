import React from 'react';

const Summary = ({ promotionAndSuppressionByHallmark }) => (
  <React.Fragment>
    {
      promotionAndSuppressionByHallmark.filter(
        (d) => d.promotes || d.suppresses
      ).length
    }{' '}
    hallmarks
    <br />
    {promotionAndSuppressionByHallmark.filter((d) => d.promotes).length} promote
    • {promotionAndSuppressionByHallmark.filter((d) => d.suppresses).length}{' '}
    suppress
  </React.Fragment>
);

export default Summary;
