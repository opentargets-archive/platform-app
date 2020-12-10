import React from 'react';
import Clampy from '@clampy-js/react-clampy';
import { Typography, withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';

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

const TargetResult = ({ classes, data, highlights }) => {
  return (
    <div className={classes.container}>
      <Link to={`/target/${data.id}/associations`} className={classes.subtitle}>
        <FontAwesomeIcon icon={faDna} className={classes.icon} />{' '}
        {data.approvedSymbol}
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
