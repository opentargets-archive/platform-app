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
  container: {
    height: '100%',
  },
  count: {
    fontWeight: 'bold',
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
      <Grid
        className={classes.container}
        container
        direction="column"
        justify="space-between"
      >
        <Grid item container justify="center">
          <PathwaysWidgetIcon
            className={classNames(classes.widgetIcon, {
              [classes.widgetIconNoData]: count === 0,
            })}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            align="center"
            color={count > 0 ? 'default' : 'secondary'}
          >
            <span className={classes.count}>{count}</span> biological processes
            and pathways involving ESR1
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

PathwaysWidget.widgetName = 'pathways';

export default withStyles(styles)(PathwaysWidget);
