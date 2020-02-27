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

const DrugResult = ({ classes, data, highlights }) => {
  return (
    <div className={classes.container}>
      <Link to={`drug/${data.id}`}>
        <DrugIcon className={classes.icon} /> {data.name}
      </Link>
      <div>
        <Typography inline variant="subtitle2">
          Matches:
        </Typography>{' '}
        <Typography
          inline
          className="highlights"
          dangerouslySetInnerHTML={{ __html: highlights.join(', ') }}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(DrugResult);
