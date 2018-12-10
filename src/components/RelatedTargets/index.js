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
      detail={<RelatedTargetsDetail ensgId={ensgId} symbol={symbol} />}
      hasData={hasData}
      sources={sources}
    >
      <Grid container justify="center">
        <RelatedTargetsWidgetIcon
          className={classNames(classes.widgetIcon, {
            [classes.widgetIconNoData]: !hasData,
          })}
        />
      </Grid>
      <Typography
        variant="h5"
        align="center"
        color={hasData ? 'default' : 'secondary'}
      >
        View the top {relatedTargetsCount} targets related to {symbol} based on
        diseases in common
      </Typography>
    </Widget>
  );
};

RelatedTargetsWidget.widgetName = 'related targets';

export default withStyles(styles)(RelatedTargetsWidget);
