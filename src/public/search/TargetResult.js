import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';
import TargetIcon from '../../icons/TargetIcon';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    marginBottom: '20px',
  },
  icon: {
    color: theme.palette.primary.main,
    verticalAlign: 'bottom',
  },
});

const TargetResult = ({ classes, data }) => {
  return (
    <div className={classes.container}>
      <Link to={`/target/${data.id}`}>{data.approvedSymbol}</Link>
      <Typography component="div">
        <Clampy clampSize="4">{data.proteinAnnotations.functions[0]}</Clampy>
      </Typography>
      <Typography>
        <TargetIcon className={classes.icon} />
        Target
      </Typography>
    </div>
  );
};

export default withStyles(styles)(TargetResult);
