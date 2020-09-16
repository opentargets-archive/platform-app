import React, { Suspense, lazy } from 'react';

import ErrorBoundary from '../../../../components/ErrorBoundary';

const ExpressionAtlasHeatmap = lazy(() =>
  import('expression-atlas-heatmap-highcharts')
);

const AtlasTab = ({ ensgId, symbol }) => {
  return (
    <ErrorBoundary
      message={`There was an error loading the Expression Atlas plugin for ${symbol}`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ExpressionAtlasHeatmap
          query={{
            species: 'homo sapiens',
            gene: ensgId,
            target: 'heatmapContainer',
          }}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AtlasTab;
