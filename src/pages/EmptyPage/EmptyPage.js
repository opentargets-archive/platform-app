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
    </Grid>
  );
};

export default withStyles(styles)(EmptyPage);
