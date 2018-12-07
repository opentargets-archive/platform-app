import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import PathwaysModal from './PathwaysModal';
import PathwaysWidgetIcon from '../icons/PathwaysWidgetIcon';

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
            <PathwaysWidgetIcon />
            <Typography variant="h5" align="center">
              <span>{pathways.count}</span> biological processes and pathways
              involving ESR1
            </Typography>
            <Typography variant="caption">Source: Reactome</Typography>
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
