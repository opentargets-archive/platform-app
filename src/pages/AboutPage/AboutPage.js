import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import BasePage from '../../components/BasePage';

const useStyles = makeStyles(theme => ({}));

function PMTLDocPage() {
  const classes = useStyles();
 

  return (
    <BasePage title="About Page">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              About Page
            </Typography>
          </Grid>
        </Grid>
      </div>
    </BasePage>
  );
}
export default PMTLDocPage;
