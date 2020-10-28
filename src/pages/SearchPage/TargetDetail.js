import React, { Fragment } from 'react';
import { CardContent, Typography, withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'ot-ui';

import LongText from '../../components/LongText';

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
    proteinAnnotations,
    bioType,
  } = data;

  const functions = proteinAnnotations ? proteinAnnotations.functions : null;
  const accessions = proteinAnnotations ? proteinAnnotations.accessions : null;

  return (
    <>
      <CardContent>
        <Typography color="primary" variant="h5">
          <Link to={`/target/${id}/associations`}>{approvedSymbol}</Link>
        </Typography>
        <Typography variant="subtitle2">{approvedName}</Typography>
        <Typography color="primary">
          <FontAwesomeIcon icon={faDna} size="md" /> Target
        </Typography>
        {functions ? <LongText lineLimit={4}>{functions[0]}</LongText> : null}
        <Typography className={classes.subtitle} variant="subtitle1">
          Biotype
        </Typography>
        <Typography variant="body2">{bioType}</Typography>
        {/* temporarily hide uniprot accessions */}
        {/* accessions && accessions.length > 0*/ false ? (
          <>
            <Typography className={classes.subtitle} variant="subtitle1">
              Uniprot accessions
            </Typography>
            {accessions.map(accession => {
              return (
                <Fragment key={accession}>
                  <Link
                    external
                    to={`http://www.uniprot.org/uniprot/${accession}`}
                  >
                    {accession}
                  </Link>{' '}
                </Fragment>
              );
            })}
          </>
        ) : null}
      </CardContent>
    </>
  );
};

export default withStyles(styles)(TargetDetail);
