import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHasData: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover $titleHasData': {
      color: 'white',
    },
    '&:hover $subheaderHasData': {
      color: 'white',
    },
    '&:hover $avatarHasData': {
      color: theme.palette.primary.main,
      backgroundColor: 'white',
    },
  },
  title: {
    color: theme.palette.grey[500],
  },
  titleHasData: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  titleError: {
    color: theme.palette.secondary.main,
  },
  subheader: {
    color: theme.palette.grey[500],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  subheaderHasData: {
    color: theme.palette.primary.main,
  },
  subheaderError: {
    color: theme.palette.secondary.main,
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
  avatarError: {
    backgroundColor: theme.palette.secondary.main,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  cardContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  content: {
    height: '100%',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingTop: 4,
    '&:last-child': {
      paddingBottom: 4,
    },
  },
});

const MiniWidget = ({
  classes,
  name,
  icon,
  loading,
  error,
  entity,
  hasData,
  summaryQuery,
  summaryProps,
  SummaryComponent,
  onClick,
}) => (
  <Grid item xs={4} md={3} lg={2}>
    <Card
      className={classNames({
        [classes.card]: true,
        [classes.cardHasData]: hasData,
        [classes.cardError]: error,
      })}
      onClick={onClick}
      elevation={0}
    >
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            className={classNames({
              [classes.avatar]: true,
              [classes.avatarHasData]: hasData,
              [classes.avatarError]: error,
            })}
          >
            {name
              .split(' ')
              .map(d => d[0].toUpperCase())
              .join('')}
          </Avatar>
        }
        action={null}
        title={
          <Typography
            className={classNames({
              [classes.title]: true,
              [classes.titleHasData]: hasData,
              [classes.titleError]: error,
            })}
          >
            {name}
          </Typography>
        }
      />
      {loading ? <LinearProgress /> : null}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.content}
      >
        <Grid item>
          <Typography
            align="center"
            className={classNames({
              [classes.subheader]: true,
              [classes.subheaderHasData]: hasData,
              [classes.subheaderError]: error,
            })}
          >
            {/* sections which don't use graphql queries
          must be rendered to allow callbacks */}
            {summaryQuery ? (
              hasData ? (
                <SummaryComponent {...entity} {...summaryProps} />
              ) : error ? (
                'An API error occurred'
              ) : loading ? null : (
                '(no data)'
              )
            ) : error ? (
              'An API error occurred'
            ) : loading ? null : (
              <SummaryComponent {...entity} {...summaryProps} />
            )}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  </Grid>
);

export default withStyles(styles)(MiniWidget);
