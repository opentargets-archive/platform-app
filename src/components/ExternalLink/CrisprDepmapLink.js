import React, { useEffect, useState } from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import { Link } from 'ot-ui';

const useStyles = makeStyles(theme => ({
  helpIcon: {
    fontSize: '10px',
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}));

function CrisprDepmapLink({ symbol }) {
  const classes = useStyles();
  const [crisprId, setCrisprId] = useState();

  useEffect(
    () => {
      async function fetchDepmap() {
        const depmapUrl = `https://api.cellmodelpassports.sanger.ac.uk/score_search/${symbol}`;
        const res = await fetch(depmapUrl);
        const data = await res.json();
        const crisprId =
          data.genes &&
          data.genes.hits.length &&
          data.genes.hits[0].symbol.toUpperCase() === symbol.toUpperCase()
            ? data.genes.hits[0].id
            : null;

        setCrisprId(crisprId);
      }

      fetchDepmap();
    },
    [symbol]
  );

  if (!crisprId) return null;

  return (
    <span>
      CRISPR depmap
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        title="CRISPR-Cas9 cancer cell line dependency data from Project Score"
        placement="top"
        interactive
      >
        <sup>
          <HelpIcon className={classes.helpIcon} />
        </sup>
      </Tooltip>
      :{' '}
      <Link external to={`https://score.depmap.sanger.ac.uk/gene/${crisprId}`}>
        {crisprId}
      </Link>
    </span>
  );
}

export default CrisprDepmapLink;
