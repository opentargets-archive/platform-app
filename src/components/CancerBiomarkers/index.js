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
  const {
    hasCancerBiomarkers: hasData,
    cancerBiomarkerCount,
    drugCount,
    diseaseCount,
    sources,
  } = cancerBiomarkers;
  return (
    <Widget
      title="Cancer biomarkers"
      detailUrlStem="cancer-biomarkers"
      detail={
        <CancerBiomarkersDetail
          ensgId={ensgId}
          symbol={symbol}
          sources={sources}
        />
      }
      detailHeader={{
        title: <React.Fragment>{symbol} - Cancer biomarkers</React.Fragment>,
        description: (
          <React.Fragment>
            Genomic biomarkers of drug responses, and their levels of clinical
            significance as described by{' '}
            <a
              href="https://europepmc.org/articles/PMC5875005"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Tamborero et al. (2018)
            </a>
            . This data is manually curated by clinical and scientific
            communities in the field of precision oncology.
          </React.Fragment>
        ),
      }}
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
            variant="body1"
            align="center"
            color={hasData ? 'default' : 'secondary'}
          >
            <strong>{cancerBiomarkerCount}</strong> biomarker
            {cancerBiomarkerCount > 1 ? 's' : null} that have an effect on the
            responsiveness of <strong>{drugCount}</strong> drug
            {drugCount > 1 ? 's' : null} when treating{' '}
            <strong>{diseaseCount}</strong> disease
            {diseaseCount > 1 ? 's' : null}
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

CancerBiomarkersWidget.widgetName = 'cancer biomarkers';

export default withStyles(styles)(CancerBiomarkersWidget);
