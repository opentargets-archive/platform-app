import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  profileHeaderContainer: {
    marginTop: '.5rem',
  },
  profileHeaderSection: {
    marginBottom: '5px',
  },
});

function ProfileHeader({ children }) {
  const classes = useStyles();

  return (
    <Grid className={classes.profileHeaderContainer} container spacing={2}>
      {React.Children.map(children, child => (
        <Grid className={classes.profileHeaderSection} item xs={12} md={6}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
}

export default ProfileHeader;
