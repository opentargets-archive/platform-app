import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'ot-ui';

import { teps } from '../constants';

const styles = () => ({
  helpIcon: {
    fontSize: '0.6rem',
  },
});

const Tep = ({ classes, ensgId, symbol }) => {
  return teps[ensgId] ? (
    <Fragment>
      {' '}
      | Target Enabling Package
      <Tooltip
        title="TEPs provide a critical mass of reagents and knowledge on a protein target to allow rapid biochemical and chemical exploration and characterisation of proteins with genetic linkage to key disease areas"
        placement="top"
      >
        <HelpIcon className={classes.helpIcon} />
      </Tooltip>
      :{' '}
      <Link external to={`https://www.thesgc.org/tep/${symbol}`}>
        {symbol}
      </Link>
    </Fragment>
  ) : null;
};

export default withStyles(styles)(Tep);
