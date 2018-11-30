import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import SimilarTargetsModal from './SimilarTargetsModal';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  bold: {
    fontWeight: 'bold',
  },
});

class SimilarTargetsWidget extends Component {
  static widgetName = 'similar targets';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/similar-targets`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const { symbol, classes, similarTargets, match } = this.props;

    return (
      <Grid item md={3}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Similar targets
            </Typography>
            <Typography variant="h4" align="center">
              {similarTargets.count}
            </Typography>
            <Typography align="center">
              number of targets related to {symbol}
            </Typography>
            <Typography variant="caption" align="center">
              average of{' '}
              <span className={classes.bold}>
                {similarTargets.averageCommonDiseases}
              </span>{' '}
              common associated diseases
            </Typography>
          </CardContent>
        </Card>
        <Route
          path={`${match.path}/similar-targets`}
          render={() => {
            return (
              <SimilarTargetsModal
                open
                onClose={this.handleClose}
                symbol={symbol}
              />
            );
          }}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(SimilarTargetsWidget));
