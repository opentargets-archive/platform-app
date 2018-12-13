import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import RelatedTargetsDetail from './Detail';
import RelatedTargetsWidgetIcon from '../../icons/RelatedTargetsWidgetIcon';

const styles = theme => ({
  widgetIcon: {
    height: '50px',
    width: '50px',
    fill: '#5a5f5f',
  },
  widgetIconNoData: {
    fill: '#e2dfdf',
  },
});

const RelatedTargetsWidget = ({
  ensgId,
  symbol,
  classes,
  relatedTargets: { relatedTargetsCount, sources },
}) => {
  const hasData = relatedTargetsCount > 0;
  return (
    <Widget
      title="Related targets"
      detailUrlStem="related-targets"
      detail={
        <RelatedTargetsDetail
          ensgId={ensgId}
          symbol={symbol}
          sources={sources}
        />
      }
      hasData={hasData}
      sources={sources}
    >
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <Grid item>
            <RelatedTargetsWidgetIcon
              className={classNames(classes.widgetIcon, {
                [classes.widgetIconNoData]: !hasData,
              })}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color={hasData ? 'default' : 'secondary'}
          >
            View the top <strong>{relatedTargetsCount}</strong> targets related
            to <strong>{symbol}</strong> based on diseases in common
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

RelatedTargetsWidget.widgetName = 'related targets';

export default withStyles(styles)(RelatedTargetsWidget);
