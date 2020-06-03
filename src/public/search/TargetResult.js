import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';
import Highlights from '../common/Highlights';
import TargetIcon from '../../icons/TargetIcon';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 500,
  },
  icon: {
    color: theme.palette.primary.main,
    verticalAlign: 'bottom',
  },
});

const TargetResult = ({ classes, data, highlights }) => {
  return (
    <div className={classes.container}>
      <Link to={`/target/${data.id}`} className={classes.subtitle}>
        <TargetIcon className={classes.icon} /> {data.approvedSymbol}
      </Link>
      {data.proteinAnnotations ? (
        <Typography variant="body2" component="div">
          <Clampy clampSize="4">{data.proteinAnnotations.functions[0]}</Clampy>
        </Typography>
      ) : null}
      <Highlights highlights={highlights} />
    </div>
  );
};

export default withStyles(styles)(TargetResult);
