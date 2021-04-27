import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import {
  faEnvelope,
  faExclamationTriangle,
  faQuestionCircle,
  faSearchPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from '../../components/Link';
import Search from '../../components/Search';

const styles = theme => ({
  icon: {
    color: theme.palette.primary.main,
    marginBottom: '12px',
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
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        size="3x"
        className={classes.icon}
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
      <Typography gutterBottom className={classes.message}>
        You might also want to ...
      </Typography>
      <Grid item container justify="center">
        <Grid item container direction="column" md={2} alignItems="center">
          <a href="https://platform-docs.opentargets.org/">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="3x"
              className={classes.icon}
            />
          </a>
          <Typography align="center" className={classes.actionText}>
            Check out our documentation
          </Typography>
        </Grid>
        <Grid item container direction="column" md={2} alignItems="center">
          <a href="mailto:helpdesk@opentargets.org">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="3x"
              className={classes.icon}
            />
          </a>
          <Typography align="center" className={classes.actionText}>
            Contact the Platform helpdesk
          </Typography>
        </Grid>
        <Grid item container direction="column" md={2} alignItems="center">
          <a href="mailto:helpdesk@opentargets.org">
            <FontAwesomeIcon
              icon={faSearchPlus}
              size="3x"
              className={classes.icon}
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
