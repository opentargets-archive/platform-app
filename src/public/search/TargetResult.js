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

const TargetResult = ({ classes, data, highlights }) => {
  return (
    <div className={classes.container}>
      <Link to={`/target/${data.id}`}>{data.approvedSymbol}</Link>
      {data.proteinAnnotations ? (
        <Typography component="div">
          <Clampy clampSize="4">{data.proteinAnnotations.functions[0]}</Clampy>
        </Typography>
      ) : null}
      <Typography>
        <Typography inline variant="subtitle2">
          Matches:
        </Typography>{' '}
        <span
          className="highlights"
          dangerouslySetInnerHTML={{ __html: highlights.join(', ') }}
        ></span>
      </Typography>
      <Typography>
        <TargetIcon className={classes.icon} />
        Target
      </Typography>
    </div>
  );
};

export default withStyles(styles)(TargetResult);
