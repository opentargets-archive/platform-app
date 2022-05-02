import React from 'react';
import { withStyles, useTheme } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';
import { clearDescriptionCodes } from '../../utils/global';
import TargetDescription from '../TargetPage/TargetDescription';

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
  const theme = useTheme();
  const targetDescription = clearDescriptionCodes(
    data.functionDescriptions,
    theme.palette.primary.main
  );

  return (
    <div className={classes.container}>
      <Link to={`/target/${data.id}/associations`} className={classes.subtitle}>
        <FontAwesomeIcon icon={faDna} className={classes.icon} />{' '}
        {data.approvedSymbol}
      </Link>
      {data.functionDescriptions.length > 0 ? (
        <TargetDescription
          descriptions={targetDescription}
          targetId={data.id}
          showLabel={false}
          lineLimit={4}
        />
      ) : null}
      <Highlights highlights={highlights} />
    </div>
  );
};

export default withStyles(styles)(TargetResult);
