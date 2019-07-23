import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    root: {
      marginTop: 8,
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    header: {
      padding: '8px 16px',
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    },
    content: {
      padding: '8px 16px',
      '&:last-child': {
        paddingBottom: '8px',
      },
    },
  };
};

const WithdrawnNotice = ({ classes, hasBeenWithdrawn, withdrawnNotice }) =>
  hasBeenWithdrawn ? (
    <Card elevation={0} className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<WarningIcon />}
        title={
          <Typography color="inherit">
            <strong>Withdrawn Drug Notice</strong>
          </Typography>
        }
      />
      <CardContent className={classes.content}>
        <Typography>
          <strong>Class: </strong>
          {withdrawnNotice.classes.length > 0
            ? withdrawnNotice.classes.join(', ')
            : null}
          <br />
          <strong>Reason: </strong>
          {withdrawnNotice.reasons.length > 0
            ? withdrawnNotice.reasons.join(', ')
            : null}
          <br />
          <strong>Year first withdrawn: </strong>
          {withdrawnNotice.year}
          <br />
          <strong>Withdrawn in: </strong>
          {withdrawnNotice.countries.length > 0
            ? withdrawnNotice.countries.join(', ')
            : null}
          <br />
        </Typography>
      </CardContent>
    </Card>
  ) : null;

export default withStyles(styles)(WithdrawnNotice);
