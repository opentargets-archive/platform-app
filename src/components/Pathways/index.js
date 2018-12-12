import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import PathwaysDetail from './Detail';
import PathwaysWidgetIcon from '../../icons/PathwaysWidgetIcon';

const styles = theme => ({
  widgetIcon: {
    height: '50px',
    width: '50px',
    fill: '#5a5f5f',
  },
  widgetIconNoData: {
    fill: '#e2dfdf',
  },
  cardContent: {
    height: '100%',
  },
});

const PathwaysWidget = ({
  ensgId,
  symbol,
  classes,
  pathways: { count, sources },
}) => {
  const hasData = count > 0;
  return (
    <Widget
      title="Pathways"
      detailUrlStem="pathways"
      detail={<PathwaysDetail ensgId={ensgId} symbol={symbol} />}
      hasData={hasData}
      sources={sources}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <Grid item>
            <PathwaysWidgetIcon
              className={classNames(classes.widgetIcon, {
                [classes.widgetIconNoData]: count === 0,
              })}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color={count > 0 ? 'default' : 'secondary'}
          >
            <strong>{count}</strong> biological processes and pathways involving{' '}
            <strong>{symbol}</strong>
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

PathwaysWidget.widgetName = 'pathways';

export default withStyles(styles)(PathwaysWidget);
