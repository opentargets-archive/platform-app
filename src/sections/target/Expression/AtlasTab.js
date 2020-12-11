import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';

import ErrorBoundary from '../../../components/ErrorBoundary';

const ExpressionAtlasHeatmap = lazy(() =>
  import('expression-atlas-heatmap-highcharts')
);

const AtlasTab = ({ ensgId, symbol }) => {
  return (
    <ErrorBoundary
      message={`There was an error loading the Expression Atlas plugin for ${symbol}`}
    >
      <Helmet
        link={[
          {
            rel: 'stylesheet',
            type: 'text/css',
            href:
              'https://www.ebi.ac.uk/gxa/resources/css/customized-bootstrap-3.3.5.css',
          },
        ]}
      />
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
