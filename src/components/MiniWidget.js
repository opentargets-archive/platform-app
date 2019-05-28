import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // height: '100px',
    // cursor: 'pointer',
    // '&:hover': {
    //   backgroundColor: theme.palette.grey[500],
    // },
    // '&:hover $title': {
    //   color: 'white', // theme.palette.grey[600],
    // },
    // '&:hover $avatar': {
    //   color: theme.palette.grey[500],
    //   backgroundColor: 'white', // theme.palette.grey[400],
    // },
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
  subheader: {
    color: theme.palette.grey[500],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  subheaderHasData: {
    color: theme.palette.primary.main,
  },
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  // cardContent: {
  //   borderTop: `1px solid ${theme.palette.grey[300]}`,
  //   paddingTop: 4,
  //   '&:last-child': {
  //     paddingBottom: 4,
  //   },
  // },
  content: {
    height: '100%',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingTop: 4,
    '&:last-child': {
      paddingBottom: 4,
    },
  },
});

const MiniWidget = ({ classes, name, icon, hasData, summary, onClick }) => (
  <Grid item xs={4} md={3} lg={2}>
    <Card
      className={classNames({
        [classes.card]: true,
        [classes.cardHasData]: hasData,
      })}
      onClick={onClick}
    >
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            className={classNames({
              [classes.avatar]: true,
              [classes.avatarHasData]: hasData,
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
            })}
          >
            {name}
          </Typography>
        }
      />

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
            })}
          >
            {hasData ? summary : '(no data)'}
          </Typography>
        </Grid>
      </Grid>

      {/* <CardContent classes={{ root: classes.cardContent }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography
              align="center"
              className={classNames({
                [classes.subheader]: true,
                [classes.subheaderHasData]: hasData,
              })}
            >
              {hasData ? summary : '(no data)'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent> */}
    </Card>
  </Grid>
);

export default withStyles(styles)(MiniWidget);
