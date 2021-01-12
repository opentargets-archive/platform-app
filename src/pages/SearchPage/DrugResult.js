import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import { Typography, withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';

import Highlights from '../../components/Highlights';
import Link from '../../components/Link';

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
  },
});

const DrugResult = ({ classes, data, highlights }) => {
  return (
    <div className={classes.container}>
      <Link to={`drug/${data.id}`} className={classes.subtitle}>
        <FontAwesomeIcon
          icon={faPrescriptionBottleAlt}
          className={classes.icon}
        />{' '}
        {data.name}
      </Link>
      {data.description && (
        <Typography variant="body2" component="div">
          <Clampy clampSize="4">{data.description}</Clampy>
        </Typography>
      )}
      <Highlights highlights={highlights} />
    </div>
  );
};

export default withStyles(styles)(DrugResult);
