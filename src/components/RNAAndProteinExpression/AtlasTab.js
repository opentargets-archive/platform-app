import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpressionAtlasHeatmap from 'expression-atlas-heatmap-highcharts';
import { Link } from 'ot-ui';

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
      <ExpressionAtlasHeatmap
        query={{ species: 'homo sapiens', gene: ensgId }}
      />
    </Fragment>
  );
};

export default AtlasTab;
