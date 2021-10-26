import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import BasePage from '../../components/BasePage';
import BentoAboutComponent from './BentoAboutComponent';

const useStyles = makeStyles(theme => ({}));

const AboutView = ({ data }) => {
  const classes = useStyles();

  return (
    <>
      <BasePage title="About Page">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BentoAboutComponent 
              data={{
                fontFamily: '"Open Sans", sans-serif',
                lineHeight: '25px',
                title: data.title ? data.title : '',
                content: data.content ? data.content : '',
                table: data.table ? data.table : '',
              }}
            />>
          </Grid>
        </Grid>
      </div>
    </BasePage>
    </>

  );
};

export default AboutView;