import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import CancerBiomarkersModal from './CancerBiomarkersModal';
import CancerBiomarkersWidgetIcon from '../icons/CancerBiomarkersWidgetIcon';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
    border: `2px solid ${theme.palette.text.primary}`,
  },
  widgetNoData: {
    border: '2px solid #E2DFDF',
  },
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

class CancerBiomarkersWidget extends Component {
  static widgetName = 'cancer biomarkers';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/cancer-biomarkers`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const { classes, cancerBiomarkers, ensgId, match } = this.props;
    const { hasCancerBiomarkers } = cancerBiomarkers;

    return (
      <Grid item md={3}>
        <Card
          onClick={this.handleClick}
          className={classNames(classes.widget, {
            [classes.widgetNoData]: !cancerBiomarkers.hasCancerBiomarkers,
          })}
        >
          <CardContent className={classes.fullHeight}>
            <Grid
              className={classes.fullHeight}
              container
              direction="column"
              justify="space-between"
            >
              <Grid item>
                <Typography
                  variant="h5"
                  align="center"
                  color={hasCancerBiomarkers ? 'default' : 'secondary'}
                >
                  Cancer biomarkers
                </Typography>
              </Grid>
              <Grid item container justify="center">
                <CancerBiomarkersWidgetIcon
                  className={classNames(classes.icon, {
                    [classes.iconNoData]: !hasCancerBiomarkers,
                  })}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color={hasCancerBiomarkers ? 'default' : 'secondary'}
                >
                  <span className={classes.bold}>
                    {cancerBiomarkers.cancerBiomarkerCount}
                  </span>{' '}
                  biomarkers that have an effect on the responsiveness of{' '}
                  <span className={classes.bold}>
                    {cancerBiomarkers.drugCount}
                  </span>{' '}
                  drug(s) when treating{' '}
                  <span className={classes.bold}>
                    {cancerBiomarkers.diseaseCount}
                  </span>{' '}
                  disease(s)
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="caption"
                  align="center"
                  color={hasCancerBiomarkers ? 'default' : 'secondary'}
                >
                  Source: Cancer Genome Interpreter
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Route
          path={`${match.path}/cancer-biomarkers`}
          render={() => {
            return (
              <CancerBiomarkersModal
                open
                onClose={this.handleClose}
                ensgId={ensgId}
              />
            );
          }}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(CancerBiomarkersWidget));
