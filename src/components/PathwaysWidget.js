import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
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
  static widgetName = 'pathways';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/pathways`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const { ensgId, symbol, classes, pathways, match } = this.props;

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
        <Route
          path={`${match.path}/pathways`}
          render={() => (
            <PathwaysModal
              open
              onClose={this.handleClose}
              ensgId={ensgId}
              symbol={symbol}
            />
          )}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(PathwaysWidget));
