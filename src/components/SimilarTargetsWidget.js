import React, { Component } from 'react';
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
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { symbol, classes, similarTargets } = this.props;
    const { isOpen } = this.state;

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
        <SimilarTargetsModal
          open={isOpen}
          onClose={this.handleClose}
          symbol={symbol}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(SimilarTargetsWidget);
