import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
  },
  widgetWithData: {
    border: `2px solid ${theme.palette.text.primary}`,
  },
  widgetNoData: {
    border: '2px solid #E2DFDF',
  },
});

class Widget extends Component {
  handleClick = () => {
    const { history, match, hasData, detailUrlStem } = this.props;
    if (hasData) {
      history.push(`${match.url}/${detailUrlStem}`);
    }
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(match.url);
  };

  render() {
    const {
      classes,
      children,
      hasData,
      title,
      sources,
      detail,
      detailUrlStem,
      xs,
      sm,
      md,
      match,
    } = this.props;

    return (
      <Grid item {...{ xs, sm, md }}>
        <Card
          onClick={this.handleClick}
          className={classNames(classes.widget, {
            [classes.widgetWithData]: hasData,
            [classes.widgetNoData]: !hasData,
          })}
        >
          <CardContent>
            <Typography
              color={hasData ? 'default' : 'secondary'}
              variant="h5"
              align="center"
            >
              {title}
            </Typography>
            {children}
            <Typography variant="caption" align="center">
              Source{sources.length > 1 ? 's' : null}:{' '}
              {sources.map(d => d.name).join(', ')}
            </Typography>
          </CardContent>
        </Card>
        <Route path={`${match.path}/${detailUrlStem}`} component={detail} />
      </Grid>
    );
  }
}

Widget.defaultProps = {
  xs: 12,
  sm: 6,
  md: 3,
  hasData: true,
  title: '<title>',
  detail: () => (
    <div>
      Unspecified <pre>detail</pre> component
    </div>
  ),
  sources: [
    { name: '<unspecified source>', url: 'https://www.targetvalidation.org' },
  ],
};

export default withStyles(styles)(withRouter(Widget));
