import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import VariationDetail from './Detail';
import VariationWidgetIcon from '../../icons/VariationWidgetIcon';

const styles = theme => ({
  icon: {
    width: '50px',
    height: '50px',
    fill: '#5a5f5f',
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

const VariationWidget = ({ classes, ensgId, symbol, name, variation }) => {
  const { common, rare, sources } = variation;
  const hasData = common.variantsCount > 0 || rare.mutationsCount > 0;

  return (
    <Widget
      title="Variants and genomic context"
      detailUrlStem="variation"
      detail={<VariationDetail ensgId={ensgId} name={name} />}
      detailHeader={{
        title: `${symbol} - Variants and genomic context`,
        description: `Genomic variants associated with ${symbol}. Only variant information associating ${symbol} with any disease is displayed. Click on any variant, gene or transcript to get more information about it. Pan or zoom the browser to see neighbouring genes. The number above gene variants means that more than 1 overlap the same region at the current zoom level. Genomic coordinates are relative to GRCh38.`,
      }}
      hasData={hasData}
      sources={sources}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <VariationWidgetIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasData,
            })}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          align="center"
          color={common.variantsCount > 0 ? 'default' : 'secondary'}
        >
          <strong>{common.variantsCount}</strong> variants in{' '}
          <strong>{common.diseasesCount}</strong> common diseases
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color={rare.mutationsCount > 0 ? 'default' : 'secondary'}
        >
          <strong>{rare.mutationsCount}</strong> variants in{' '}
          <strong>{rare.diseasesCount}</strong> common diseases
        </Typography>
      </Grid>
    </Widget>
  );
};

VariationWidget.widgetName = 'variants and genomic context';

export default withStyles(styles)(VariationWidget);
