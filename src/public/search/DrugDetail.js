import React, { Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';

const styles = () => ({
  subtitle: {
    fontWeight: 500,
  },
  icon: {
    verticalAlign: 'bottom',
  },
});

const DrugDetail = ({ classes, data }) => {
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        {data.name}
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        Drug Type
      </Typography>
      <Typography>{data.drugType}</Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        Maximum Clinical Trial Phase
      </Typography>
      <Typography>{data.maximumClinicalTrialPhase}</Typography>
      {data.hasBeenWithdrawn && (
        <>
          <Typography variant="subtitle1">Withdrawn message</Typography>
          <Typography>{data.withdrawnNotice.year}</Typography>
        </>
      )}
      <Typography className={classes.subtitle} variant="subtitle1">
        Indications
      </Typography>
      {data.linkedDiseases.rows.map(disease => (
        <Fragment key={disease}>
          <Link to={`/disease/${disease}`}>{disease}</Link>{' '}
        </Fragment>
      ))}
      <Typography className={classes.subtitle} variant="subtitle1">
        Drug targets
      </Typography>
      {data.linkedTargets.rows.map(target => (
        <Fragment key={target.id}>
          <Link to={`/target/${target.id}`}>{target.approvedSymbol}</Link>{' '}
        </Fragment>
      ))}
      <Typography className={classes.subtitle} variant="subtitle1">
        Synonyms
      </Typography>
      {data.synonyms.map(synonym => (
        <Fragment key={synonym}>
          <Typography inline>{synonym}</Typography>{' '}
        </Fragment>
      ))}
      <Typography className={classes.subtitle} variant="subtitle1">
        Trade names
      </Typography>
      {data.tradeNames.map(tradeName => (
        <span key={tradeName}>{tradeName}</span>
      ))}
    </CardContent>
  );
};

export default withStyles(styles)(DrugDetail);
