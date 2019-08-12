import React, { Fragment, Suspense, lazy } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';

const ExpressionAtlasHeatmap = lazy(() =>
  import('expression-atlas-heatmap-highcharts')
);

const AtlasTab = ({ ensgId }) => {
  return (
    <Fragment>
      <Typography variant="caption">
        Sources:{' '}
        <Link
          external
          to="https://docs.targetvalidation.org/data-sources/rna-expression#expression-atlas"
        >
          Expression Atlas
        </Link>
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <ExpressionAtlasHeatmap
          query={{ species: 'homo sapiens', gene: ensgId }}
        />
      </Suspense>
    </Fragment>
  );
};

export default AtlasTab;
