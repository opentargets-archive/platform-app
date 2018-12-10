import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
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
  cardContent: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  count: {
    fontWeight: 'bold',
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
    const {
      ensgId,
      symbol,
      classes,
      pathways: { count },
      match,
    } = this.props;

    return (
      <Grid item md={3}>
        <Card
          onClick={this.handleClick}
          className={classNames(classes.widget, {
            [classes.widgetNoData]: count === 0,
          })}
        >
          <CardContent className={classes.cardContent}>
            <Grid
              className={classes.container}
              container
              direction="column"
              justify="space-between"
            >
              <Grid item>
                <Typography
                  variant="h5"
                  align="center"
                  color={count > 0 ? 'default' : 'secondary'}
                >
                  Pathways
                </Typography>
              </Grid>
              <Grid item container justify="center">
                <PathwaysWidgetIcon
                  className={classNames(classes.widgetIcon, {
                    [classes.widgetIconNoData]: count === 0,
                  })}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  align="center"
                  color={count > 0 ? 'default' : 'secondary'}
                >
                  <span className={classes.count}>{count}</span> biological
                  processes and pathways involving ESR1
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="caption"
                  align="center"
                  color={count > 0 ? 'default' : 'secondary'}
                >
                  Source: Reactome
                </Typography>
              </Grid>
            </Grid>
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
