import React from 'react';
import Typography from '@material-ui/core/Typography';
import Clampy from '@clampy-js/react-clampy';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';
import Highlights from '../common/Highlights';
import DiseaseIcon from '../../icons/DiseaseIcon';

const styles = theme => ({
  container: {
    marginBottom: '20px',
  },
  icon: {
    color: theme.palette.primary.main,
    verticalAlign: 'bottom',
  },
  matches: {
    marginTop: '9px',
  },
});

const DiseaseResult = ({ classes, data, highlights }) => {
  return (
    <div className={classes.container}>
      <Link to={`/disease/${data.id}`}>
        <DiseaseIcon className={classes.icon} /> {data.name}
      </Link>
      {data.description && (
        <Typography component="div">
          <Clampy clampSize="4">{data.description}</Clampy>
        </Typography>
      )}
      <Highlights highlights={highlights} />
    </div>
  );
};

export default withStyles(styles)(DiseaseResult);
