import React from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import { Link } from 'ot-ui';

const useStyles = makeStyles({
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
    link: 'https://www.thesgc.org/tep/hdac6',
  },
  ENSG00000120733: {
    id: 'ENSG00000120733',
    symbol: 'KDM3B',
    link: 'https://www.thesgc.org/tep/kdm3b',
  },
  ENSG00000186280: {
    id: 'ENSG00000186280',
    symbol: 'KDM4D',
    link: 'https://www.thesgc.org/tep/kdm4d',
  },
  ENSG00000146247: {
    id: 'ENSG00000146247',
    symbol: 'PHIP',
    link: 'https://www.thesgc.org/tep/phip',
  },
  ENSG00000108469: {
    id: 'ENSG00000108469',
    symbol: 'RECQL5',
    link: 'https://www.thesgc.org/tep/recql5',
  },
  ENSG00000143379: {
    id: 'ENSG00000143379',
    symbol: 'SETDB1',
    link: 'https://www.thesgc.org/tep/setdb1',
  },
  ENSG00000167258: {
    id: 'ENSG00000167258',
    symbol: 'CDK12',
    link: 'https://www.thesgc.org/tep/cdk12',
  },
  ENSG00000106683: {
    id: 'ENSG00000106683',
    symbol: 'LIMK1',
    link: 'https://www.thesgc.org/tep/limk1',
  },
  ENSG00000198924: {
    id: 'ENSG00000198924',
    symbol: 'DCLRE1A',
    link: 'https://www.thesgc.org/tep/dclre1a',
  },
  ENSG00000172269: {
    id: 'ENSG00000172269',
    symbol: 'DPAGT1',
    link: 'https://www.thesgc.org/tep/dpagt1',
  },
  ENSG00000008311: {
    id: 'ENSG00000008311',
    symbol: 'AASS',
    link: 'https://www.thesgc.org/tep/aass',
  },
  ENSG00000196632: {
    id: 'ENSG00000196632',
    symbol: 'WNK3',
    link: 'https://www.thesgc.org/tep/wnk3',
  },
  ENSG00000104312: {
    id: 'ENSG00000104312',
    symbol: 'RIPK2',
    link: 'https://www.thesgc.org/tep/ripk2',
  },
  ENSG00000101323: {
    id: 'ENSG00000101323',
    symbol: 'HAO1',
    link: 'https://www.thesgc.org/tep/hao1',
  },
  ENSG00000168143: {
    id: 'ENSG00000168143',
    symbol: 'FAM83B',
    link: 'https://www.thesgc.org/tep/fam83b',
  },
  ENSG00000173193: {
    id: 'ENSG00000173193',
    symbol: 'PARP14',
    link: 'https://www.thesgc.org/tep/parp14',
  },
  ENSG00000140876: {
    id: 'ENSG00000140876',
    symbol: 'NUDT7',
    link: 'https://www.thesgc.org/tep/nudt7',
  },
  ENSG00000138622: {
    id: 'ENSG00000138622',
    symbol: 'HCN4',
    link: 'https://www.thesgc.org/tep/hcn4',
  },
  ENSG00000130382: {
    id: 'ENSG00000130382',
    symbol: 'MLLT1',
    link: 'https://www.thesgc.org/tep/mllt1',
  },
  ENSG00000213930: {
    id: 'ENSG00000213930',
    symbol: 'GALT',
    link: 'https://www.thesgc.org/tep/galt-galk1',
  },
  ENSG00000108479: {
    id: 'ENSG00000108479',
    symbol: 'GALK1',
    link: 'https://www.thesgc.org/tep/galt-galk1',
  },
  ENSG00000160746: {
    id: 'ENSG00000160746',
    symbol: 'ANO10',
    link: 'https://www.thesgc.org/tep/tmem16k',
  },
  ENSG00000076321: {
    id: 'ENSG00000076321',
    symbol: 'KLHL20',
    link: 'https://www.thesgc.org/tep/klhl20',
  },
  ENSG00000079999: {
    id: 'ENSG00000079999',
    symbol: 'KEAP1',
    link: 'https://www.thesgc.org/tep/keap1',
  },
  ENSG00000158578: {
    id: 'ENSG00000158578',
    symbol: 'ALAS2',
    link: 'https://www.thesgc.org/tep/alas2',
  },
  ENSG00000160145: {
    id: 'ENSG00000160145',
    symbol: 'KALRN',
    link: 'https://www.thesgc.org/tep/kalrnrac1',
  },
  ENSG00000136238: {
    id: 'ENSG00000136238',
    symbol: 'RAC1',
    link: 'https://www.thesgc.org/tep/kalrnrac1',
  },
  ENSG00000171303: {
    id: 'ENSG00000171303',
    symbol: 'KCNK3',
    link: 'https://www.thesgc.org/tep/task1',
  },
};

function TepLink({ ensgId, symbol }) {
  const classes = useStyles();

  if (!teps[ensgId]) return null;

  return (
    <span>
      Target Enabling Package
      <Tooltip
        classes={{ tooltip: classes.tepTooltip }}
        title={
          <>
            <Link external to="https://www.thesgc.org">
              TEPs
            </Link>{' '}
            provide a critical mass of reagents and knowledge on a protein
            target to allow rapid biochemical and chemical exploration and
            characterisation of proteins with genetic linkage to key disease
            areas.
          </>
        }
        placement="top"
        interactive
      >
        <sup>
          <HelpIcon className={classes.helpIcon} />
        </sup>
      </Tooltip>
      :{' '}
      <Link external to={teps[ensgId].link}>
        {symbol}
      </Link>
    </span>
  );
}

export default TepLink;
