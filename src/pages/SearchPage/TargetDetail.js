import React, { Fragment } from 'react';
import { CardContent, Typography, withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';

import Link from '../../components/Link';
import LongText from '../../components/LongText';
import { getUniprotIds } from '../../utils/global';

const styles = () => ({
  subtitle: {
    fontWeight: 500,
  },
});

const TargetDetail = ({ classes, data }) => {
  const {
    id,
    approvedSymbol,
    approvedName,
    functionDescriptions,
    biotype,
    proteinIds,
  } = data;

  const uniprotIds = getUniprotIds(proteinIds);

  return (
    <>
      <CardContent>
        <Typography color="primary" variant="h5">
          <Link to={`/target/${id}/associations`}>{approvedSymbol}</Link>
        </Typography>
        <Typography variant="subtitle2">{approvedName}</Typography>
        <Typography color="primary">
          <FontAwesomeIcon icon={faDna} /> Target
        </Typography>
        {functionDescriptions.length > 0 ? (
          <LongText lineLimit={4}>{functionDescriptions[0]}</LongText>
        ) : null}
        <Typography className={classes.subtitle} variant="subtitle1">
          Biotype
        </Typography>
        <Typography variant="body2">{biotype}</Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          UniProt accession{uniprotIds.length > 1 ? 's' : ''}
        </Typography>
        <Typography component="div" variant="body2">
          {uniprotIds.map(id => (
            <div key={id}>{id}</div>
          ))}
        </Typography>
      </CardContent>
    </>
  );
};

export default withStyles(styles)(TargetDetail);
