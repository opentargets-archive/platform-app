import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import RelatedTargetsModal from './Detail';
import RelatedTargetsWidgetIcon from '../../icons/RelatedTargetsWidgetIcon';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
    border: `2px solid ${theme.palette.text.primary}`,
  },
  widgetNoData: {
    border: '2px solid #E2DFDF',
  },
  widgetIcon: {
    height: '50px',
    width: '50px',
    fill: '#5a5f5f',
  },
  widgetIconNoData: {
    fill: '#e2dfdf',
  },
  bold: {
    fontWeight: 'bold',
  },
});

class RelatedTargetsWidget extends Component {
  static widgetName = 'related targets';

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
        <Card
          onClick={this.handleClick}
          className={classNames(classes.widget, {
            [classes.widgetNoData]: relatedTargetsCount === 0,
          })}
        >
          <CardContent>
            <Grid container direction="column">
              <Typography
                variant="h5"
                align="center"
                color={relatedTargetsCount > 0 ? 'default' : 'secondary'}
              >
                Related Targets
              </Typography>
              <Grid container justify="center">
                <RelatedTargetsWidgetIcon
                  className={classNames(classes.widgetIcon, {
                    [classes.widgetIconNoData]: relatedTargetsCount === 0,
                  })}
                />
              </Grid>
              <Typography
                variant="h5"
                align="center"
                color={relatedTargetsCount > 0 ? 'default' : 'secondary'}
              >
                View the top {relatedTargetsCount} targets related to {symbol}{' '}
                based on diseases in common
              </Typography>
              <Typography
                variant="caption"
                align="center"
                color={relatedTargetsCount > 0 ? 'default' : 'secondary'}
              >
                Source: Open Targets
              </Typography>
            </Grid>
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
