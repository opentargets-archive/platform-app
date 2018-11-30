import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import CancerBiomarkersModal from './CancerBiomarkersModal';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  bold: {
    fontWeight: 'bold',
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

    return (
      <Grid item md={3}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Cancer biomarkers
            </Typography>
            <Typography variant="h4" align="center">
              {cancerBiomarkers.count}
            </Typography>
            <Typography variant="body2" align="center">
              number of biomarkers associated with{' '}
              <span className={classes.bold}>
                {cancerBiomarkers.diseaseCount}
              </span>{' '}
              disease(s)
            </Typography>
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
