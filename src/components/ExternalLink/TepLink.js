import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles, Tooltip } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import Link from '../Link';

const TEP_LINK_QUERY = loader('./TepLinkQuery.gql');

const useStyles = makeStyles(theme => ({
  helpIcon: {
    fontSize: '10px',
  },
  tepTooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}));

function TepLink({ ensgId }) {
  const classes = useStyles();

  const { loading, data } = useQuery(TEP_LINK_QUERY, {
    variables: { ensgId },
  });

  if (loading) return <span>Loading ...</span>;

  if (!data.target?.tep) return null;

  const {
    target: {
      tep: { name, uri },
    },
  } = data;

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
      <Link external to={uri}>
        {name}
      </Link>
    </span>
  );
}

export default TepLink;
