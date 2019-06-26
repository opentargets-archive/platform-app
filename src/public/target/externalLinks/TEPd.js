import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'ot-ui';

const styles = () => ({
  helpIcon: {
    fontSize: '10px',
  },
  tepTooltip: {
    backgroundColor: 'black',
  },
});

// TODO: this should be in the api
const teps = {
  ENSG00000094631: {
    id: 'ENSG00000094631',
    symbol: 'HDAC6',
  },
  ENSG00000120733: {
    id: 'ENSG00000120733',
    symbol: 'KDM3B',
  },
  ENSG00000186280: {
    id: 'ENSG00000186280',
    symbol: 'KDM4D',
  },
  ENSG00000146247: {
    id: 'ENSG00000146247',
    symbol: 'PHIP',
  },
  ENSG00000108469: {
    id: 'ENSG00000108469',
    symbol: 'RECQL5',
  },
  ENSG00000143379: {
    id: 'ENSG00000143379',
    symbol: 'SETDB1',
  },
  ENSG00000167258: {
    id: 'ENSG00000167258',
    symbol: 'CDK12',
  },
  ENSG00000106683: {
    id: 'ENSG00000106683',
    symbol: 'LIMK1',
  },
  ENSG00000198924: {
    id: 'ENSG00000198924',
    symbol: 'DCLRE1A',
  },
  ENSG00000172269: {
    id: 'ENSG00000172269',
    symbol: 'DPAGT1',
  },
  ENSG00000008311: {
    id: 'ENSG00000008311',
    symbol: 'AASS',
  },
  ENSG00000196632: {
    id: 'ENSG00000196632',
    symbol: 'WNK3',
  },
  ENSG00000104312: {
    id: 'ENSG00000104312',
    symbol: 'RIPK2',
  },
  ENSG00000101323: {
    id: 'ENSG00000101323',
    symbol: 'HAO1',
  },
  ENSG00000168143: {
    id: 'ENSG00000168143',
    symbol: 'FAM83B',
  },
  ENSG00000173193: {
    id: 'ENSG00000173193',
    symbol: 'PARP14',
  },
  ENSG00000140876: {
    id: 'ENSG00000140876',
    symbol: 'NUDT7',
  },
  ENSG00000138622: {
    id: 'ENSG00000138622',
    symbol: 'HCN4',
  },
  ENSG00000130382: {
    id: 'ENSG00000130382',
    symbol: 'MLLT1',
  },
};

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
