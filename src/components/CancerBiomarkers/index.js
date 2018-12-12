import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Widget from '../Widget';
import CancerBiomarkersDetail from './Detail';
import CancerBiomarkersWidgetIcon from '../../icons/CancerBiomarkersWidgetIcon';

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
      <Grid container direction="column" justify="space-between">
        <Grid item container justify="center">
          <Grid item>
            <CancerBiomarkersWidgetIcon
              className={classNames(classes.icon, {
                [classes.iconNoData]: !hasData,
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
            <strong>{cancerBiomarkers.cancerBiomarkerCount}</strong> biomarkers
            that have an effect on the responsiveness of{' '}
            <strong>{cancerBiomarkers.drugCount}</strong> drug(s) when treating{' '}
            <strong>{cancerBiomarkers.diseaseCount}</strong> disease(s)
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

CancerBiomarkersWidget.widgetName = 'cancer biomarkers';

export default withStyles(styles)(CancerBiomarkersWidget);
