import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Search from './search/Search';
import { Link } from 'ot-ui';

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
});

const EmptyPage = ({ classes }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Icon
        className={`fa fa-exclamation-triangle ${classes.warningIcon}`}
        color="action"
        fontSize="large"
      />
      <Typography variant="h5">Sorry</Typography>
      <Typography>
        We could not find anything in the Platform database that matches
      </Typography>
      <Search />
      <Typography className={classes.suggestions} variant="caption">
        <Grid container justify="space-between">
          Try:
          <Link to="/target/ENSG00000105810">CDK6</Link>
          <Link to="/disease/EFO_0003086">kidney disease</Link>
          <Link to="/target/ENSG00000145777">ENSG00000145777</Link>
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
