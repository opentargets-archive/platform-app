import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import { PALETTE } from 'ot-ui';

const styles = () => ({
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    minHeight: '1.8rem',
    height: '100%',
  },
  highlight: {
    backgroundColor: PALETTE.purple,
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
