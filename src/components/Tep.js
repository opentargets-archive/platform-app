import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'ot-ui';

import { teps } from '../constants';

const styles = () => ({
  helpIcon: {
    fontSize: '10px',
  },
  tepTooltip: {
    backgroundColor: 'black',
  },
});

const Tep = ({ classes, ensgId, symbol }) => {
  return teps[ensgId] ? (
    <Fragment>
      {' '}
      | Target Enabling Package
      <Tooltip
        classes={{ tooltip: classes.tepTooltip }}
        title={
          <Fragment>
            <Link external to="https://www.thesgc.org">
              TEPs
            </Link>{' '}
            provide a critical mass of reagents and knowledge on a protein
            target to allow rapid biochemical and chemical exploration and
            characterisation of proteins with genetic linkage to key disease
            areas.
          </Fragment>
        }
        placement="top"
        interactive
      >
        <sup>
          <HelpIcon className={classes.helpIcon} />
        </sup>
      </Tooltip>
      :{' '}
      <Link external to={`https://www.thesgc.org/tep/${symbol}`}>
        {symbol}
      </Link>
    </Fragment>
  ) : null;
};

export default withStyles(styles)(Tep);
