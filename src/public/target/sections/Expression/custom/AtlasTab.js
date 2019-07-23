import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpressionAtlasRenderer from './AtlasRenderer';
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
      <ExpressionAtlasRenderer ensgId={ensgId} />
    </Fragment>
  );
};

export default AtlasTab;
