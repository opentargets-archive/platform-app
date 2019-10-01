import React, { Fragment, Suspense, lazy } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';

const ExpressionAtlasHeatmap = lazy(() =>
  import('expression-atlas-heatmap-highcharts')
);

class AtlasHandler extends React.Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    if (error) {
      return { hasError: true };
    } else {
      return null;
    }
  }
  render() {
    const { ensgId, symbol } = this.props;
    const { hasError } = this.state;
    return hasError ? (
      <Typography color="error">
        There was an error loading the Expression Atlas plugin for {symbol}.
      </Typography>
    ) : (
      <Suspense fallback={<div>Loading...</div>}>
        <ExpressionAtlasHeatmap
          query={{
            species: 'homo sapiens',
            gene: ensgId,
            target: 'heatmapContainer',
          }}
        />
      </Suspense>
    );
  }
}

const AtlasTab = ({ ensgId, symbol }) => {
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
        <AtlasHandler {...{ ensgId, symbol }} />
      </Typography>
    </Fragment>
  );
};

export default AtlasTab;
