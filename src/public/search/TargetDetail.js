import React, { Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';
import LongText from '../common/LongText';
import TargetIcon from '../../icons/TargetIcon';

const styles = () => ({
  subtitle: {
    fontWeight: 500,
  },
  icon: {
    verticalAlign: 'bottom',
  },
});

const TargetDetail = ({ classes, data }) => {
  const {
    id,
    approvedSymbol,
    approvedName,
    proteinAnnotations,
    bioType,
    associationsOnTheFly: { rows },
  } = data;

  const functions = proteinAnnotations ? proteinAnnotations.functions : null;
  const accessions = proteinAnnotations ? proteinAnnotations.accessions : null;

  return (
    <>
      <CardContent>
        <Typography color="primary" variant="h5">
          <Link to={`/target/${id}`}>{approvedSymbol}</Link>
        </Typography>
        <Typography variant="subtitle2">{approvedName}</Typography>
        <Typography color="primary">
          <TargetIcon className={classes.icon} /> Target
        </Typography>
        {functions ? <LongText lineLimit={4}>{functions[0]}</LongText> : null}
        {/* temporarily hide top associated diseases */}
        {/* rows.length > 0*/ false && (
          <>
            <Typography className={classes.subtitle} variant="subtitle1">
              Top associated diseases
            </Typography>
            {rows.map(({ id }) => {
              return (
                <Fragment key={id}>
                  <Link to={`/disease/${id}`}>{id}</Link>{' '}
                </Fragment>
              );
            })}
          </>
        )}
        <Typography className={classes.subtitle} variant="subtitle1">
          Biotype
        </Typography>
        <Typography>{bioType}</Typography>
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
