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
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[500],
    },
    '&:hover $title': {
      color: 'white', // theme.palette.grey[600],
    },
    '&:hover $avatar': {
      color: theme.palette.grey[500],
      backgroundColor: 'white', // theme.palette.grey[400],
    },
  },
  cardHasData: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover $titleHasData': {
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
  avatar: {
    color: 'white',
    backgroundColor: theme.palette.grey[300],
  },
  avatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
});

const MiniWidget = ({ classes, name, icon, hasData, onClick }) => (
  <Grid item xs={4} md={3} lg={2}>
    <Card
      className={classNames({
        [classes.card]: true,
        [classes.cardHasData]: hasData,
      })}
      onClick={onClick}
    >
      <CardHeader
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
    </Card>
  </Grid>
);

export default withStyles(styles)(MiniWidget);
