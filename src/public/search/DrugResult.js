import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'ot-ui';
import DrugIcon from '../../icons/DrugIcon';

const styles = theme => ({
  container: {
    marginBottom: '20px',
  },
  icon: {
    color: theme.palette.primary.main,
    verticalAlign: 'bottom',
  },
});

const DrugResult = ({ classes, data }) => {
  return (
    <div className={classes.container}>
      <Link to={`drug/${data.id}`}>{data.name}</Link>
      <Typography>
        <DrugIcon className={classes.icon} />
        Drug
      </Typography>
    </div>
  );
};

export default withStyles(styles)(DrugResult);
