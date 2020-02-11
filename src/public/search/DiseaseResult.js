import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';
import DiseaseIcon from '../../icons/DiseaseIcon';

const styles = theme => ({
  container: {
    marginBottom: '20px',
  },
  icon: {
    color: theme.palette.primary.main,
    verticalAlign: 'bottom',
  },
});

const DiseaseResult = ({ classes, data }) => {
  return (
    <div className={classes.container}>
      <Link to={`/disease/${data.id}`}>{data.name}</Link>
      <Typography>{data.description}</Typography>
      <Typography>
        <DiseaseIcon className={classes.icon} /> Disease
      </Typography>
    </div>
  );
};

export default withStyles(styles)(DiseaseResult);
