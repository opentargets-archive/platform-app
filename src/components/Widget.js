import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from './Modal';
import { CardHeader /* CardActions */ } from '@material-ui/core';

const styles = theme => ({
  widget: {
    height: theme.widgetHeight,
    display: 'flex',
    flexFlow: 'column',
    cursor: 'pointer',
  },
  widgetWithData: {
    border: `2px solid ${theme.palette.text.primary}`,
    '&:hover': {
      borderColor: theme.palette.purple,
    },
  },
  widgetNoData: {
    border: '2px solid #E2DFDF',
  },
  widgetHeader: {
    padding: '8px 12px',
    minHeight: '47px',
  },
  widgetContent: {
    padding: '6px 12px',
    flex: 2,
    overflow: 'auto',
  },
  widgetFooter: {
    padding: '8px 12px',
    minHeight: '20px',
  },
  widgetSources: {
    width: '100%',
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
      // sources,
      detail,
      detailUrlStem,
      detailHeader,
      xs,
      sm,
      md,
      lg,
      match,
    } = this.props;

    const detailHeaderFull = {
      sources: this.props.sources,
      title: detailHeader.title || this.props.title,
      description: detailHeader.description,
    };

    return (
      <Grid item {...{ xs, sm, md, lg }}>
        <Card
          onClick={this.handleClick}
          className={classNames(classes.widget, {
            [classes.widgetWithData]: hasData,
            [classes.widgetNoData]: !hasData,
          })}
        >
          <CardHeader
            className={classes.widgetHeader}
            title={title}
            titleTypographyProps={{
              align: 'center',
              color: hasData ? 'default' : 'secondary',
            }}
          />
          <CardContent className={classes.widgetContent}>
            {children}
          </CardContent>
          {/*<CardActions className={classes.widgetFooter}>
            <Typography
              className={classes.widgetSources}
              variant="caption"
              align="center"
              color={hasData ? 'default' : 'secondary'}
            >
              Source{sources.length > 1 ? 's' : null}:{' '}
              {sources.map(d => d.name).join(', ')}
            </Typography>
          </CardActions>*/}
        </Card>
        <Route
          path={`${match.path}/${detailUrlStem}`}
          render={() => (
            <Modal open onClose={this.handleClose} header={detailHeaderFull}>
              {detail}
            </Modal>
          )}
        />
      </Grid>
    );
  }
}

Widget.defaultProps = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 3,
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
