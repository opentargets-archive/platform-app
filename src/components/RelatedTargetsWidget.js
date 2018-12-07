import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import RelatedTargetsModal from './RelatedTargetsModal';
import RelatedTargetsWidgetIcon from '../icons/RelatedTargetsWidgetIcon';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  bold: {
    fontWeight: 'bold',
  },
});

class RelatedTargetsWidget extends Component {
  static widgetName = 'similar targets';

  handleClick = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/related-targets`);
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const {
      symbol,
      classes,
      relatedTargets: { relatedTargetsCount },
      match,
    } = this.props;

    return (
      <Grid item md={3}>
        <Card onClick={this.handleClick} className={classes.widget}>
          <CardContent>
            <Typography variant="h5" align="center">
              Related targets
            </Typography>
            <RelatedTargetsWidgetIcon />
            <Typography variant="caption" align="center">
              View the top {relatedTargetsCount} targets related to {symbol}{' '}
              based on diseases in common
            </Typography>
            <Typography variant="caption" align="center">
              Source: Open Targets
            </Typography>
          </CardContent>
        </Card>
        <Route
          path={`${match.path}/related-targets`}
          render={() => {
            return (
              <RelatedTargetsModal
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

export default withStyles(styles)(withRouter(RelatedTargetsWidget));
