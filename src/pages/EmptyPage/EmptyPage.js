import React from 'react';
import { Icon, Grid, Typography, withStyles } from '@material-ui/core';

import { Link } from 'ot-ui';

import Search from '../../components/Search';

const styles = theme => ({
  warningIcon: {
    width: '40px',
  },
  actionText: {
    width: '150px',
  },
  suggestions: {
    width: '450px',
    marginBottom: '42px',
  },
  message: {
    marginBottom: '24px',
  },
});

const EmptyPage = ({ classes, children }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Icon
        className={`fa fa-exclamation-triangle ${classes.warningIcon}`}
        color="action"
        fontSize="large"
      />
      <Typography variant="h5">Sorry</Typography>
      <div className={classes.message}>{children}</div>
      <Search />
      <Typography className={classes.suggestions} variant="caption">
        <Grid container justify="space-between">
          Try:
          <Link to="/target/ENSG00000105810/associations">CDK6</Link>
          <Link to="/disease/EFO_0003086/associations">kidney disease</Link>
          <Link to="/target/ENSG00000145777/associations">ENSG00000145777</Link>
          <Link to="/drug/CHEMBL112">acetaminophen</Link>
          <Link to="/drug/CHEMBL3137343">Keytruda</Link>
        </Grid>
      </Typography>
      <Typography gutterBottom>You might also want to ...</Typography>
      <Grid item container justify="center">
        <Grid item container direction="column" md={2} alignItems="center">
          <a href="https://docs.targetvalidation.org/getting-started/getting-started">
            <Icon
              className="fa fa-question-circle"
              color="primary"
              fontSize="large"
            />
          </a>
          <Typography align="center" className={classes.actionText}>
            Check out our documentation
          </Typography>
        </Grid>
        <Grid item container direction="column" md={2} alignItems="center">
          <a href="mailto:support@targetvalidation.org">
            <Icon className="fa fa-envelope" color="primary" fontSize="large" />
          </a>
          <Typography align="center" className={classes.actionText}>
            Contact our support team
          </Typography>
        </Grid>
        <Grid item container direction="column" md={2} alignItems="center">
          <a href="mailto:support@targetvalidation.org">
            <Icon
              className="fa fa-search-plus"
              color="primary"
              fontSize="large"
            />
          </a>
          <Typography align="center" className={classes.actionText}>
            Suggest a target, disease, or drug
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(EmptyPage);
