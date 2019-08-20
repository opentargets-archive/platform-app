import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[500]}`,
    minHeight: '1.8rem',
    height: '100%',
  },
  highlight: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
});

const AssociationSummary = ({ classes, data }) => {
  return (
    <Grid container spacing={8}>
      {data.map(datum => (
        <Grid item key={datum.id} xs={4} md={2}>
          <Typography
            className={classNames(classes.item, {
              [classes.highlight]: datum.isAssociated,
            })}
            align="center"
          >
            {datum.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(AssociationSummary);
