import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import CancerBiomarkersDetail from './Detail';
import CancerBiomarkersWidgetIcon from '../../icons/CancerBiomarkersWidgetIcon';

const styles = theme => ({
  fullHeight: {
    height: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  icon: {
    width: '50px',
    height: '50px',
    fill: '#5a5f5f',
  },
  iconNoData: {
    fill: '#e2dfdf',
  },
});

const CancerBiomarkersWidget = ({
  classes,
  cancerBiomarkers,
  ensgId,
  symbol,
}) => {
  const { hasCancerBiomarkers: hasData, sources } = cancerBiomarkers;
  return (
    <Widget
      title="Cancer biomarkers"
      detailUrlStem="cancer-biomarkers"
      detail={<CancerBiomarkersDetail ensgId={ensgId} symbol={symbol} />}
      hasData={hasData}
      sources={sources}
    >
      <Grid
        className={classes.fullHeight}
        container
        direction="column"
        justify="space-between"
      >
        <Grid item container justify="center">
          <CancerBiomarkersWidgetIcon
            className={classNames(classes.icon, {
              [classes.iconNoData]: !hasData,
            })}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color={hasData ? 'default' : 'secondary'}
          >
            <span className={classes.bold}>
              {cancerBiomarkers.cancerBiomarkerCount}
            </span>{' '}
            biomarkers that have an effect on the responsiveness of{' '}
            <span className={classes.bold}>{cancerBiomarkers.drugCount}</span>{' '}
            drug(s) when treating{' '}
            <span className={classes.bold}>
              {cancerBiomarkers.diseaseCount}
            </span>{' '}
            disease(s)
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

CancerBiomarkersWidget.widgetName = 'cancer biomarkers';

export default withStyles(styles)(CancerBiomarkersWidget);
