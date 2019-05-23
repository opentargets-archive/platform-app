import React, { Fragment } from 'react';
import ExpressionAtlasHeatmap from 'expression-atlas-heatmap-highcharts';

const AtlasTab = ({ ensgId }) => {
  return (
    <Fragment>
      <ExpressionAtlasHeatmap
        query={{ species: 'homo sapiens', gene: ensgId }}
      />
    </Fragment>
  );
};

export default AtlasTab;
