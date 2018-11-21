import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import PathwaysModal from './PathwaysModal';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
});

class PathwaysWidget extends Component {
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
    const { symbol, classes, pathways } = this.props;
    const { isOpen } = this.state;

    return (
      <Grid item md={3}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Pathways
            </Typography>
            <Typography variant="h4" align="center">
              {pathways.count}
            </Typography>
            <Typography variant="body2" align="center">
              number of biological pathways involving {symbol}
            </Typography>
          </CardContent>
        </Card>
        <PathwaysModal
          open={isOpen}
          onClose={this.handleClose}
          symbol={symbol}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(PathwaysWidget);
