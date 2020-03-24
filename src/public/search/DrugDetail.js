import React, { Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import WarningIcon from '@material-ui/icons/Warning';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'ot-ui';
import LongText from '../common/LongText';
import WarningTooltip from '../common/WarningTooltip';
import WithdrawnNotice from '../common/WithdrawnNotice';
import DrugIcon from '../../icons/DrugIcon';

const styles = () => ({
  chip: { margin: '2px 2px', height: '20px' },
  subtitle: {
    fontWeight: 500,
  },
  icon: {
    verticalAlign: 'text-bottom',
  },
});

const DrugDetail = ({ classes, data }) => {
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        <Link to={`/drug/${data.id}`}>{data.name}</Link>
      </Typography>
      <Typography color="primary">
        <DrugIcon className={classes.icon} /> Drug
      </Typography>
      {data.hasBeenWithdrawn && (
        <Typography className={classes.subtitle} color="error">
          Withdrawn Drug{' '}
          <WarningTooltip
            title={<WithdrawnNotice withdrawnNotice={data.withdrawnNotice} />}
          >
            <WarningIcon className={classes.icon} />
          </WarningTooltip>
        </Typography>
      )}
      <Typography className={classes.subtitle} variant="subtitle1">
        Drug Type
      </Typography>
      <Typography>{data.drugType}</Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        Maximum Clinical Trial Phase
      </Typography>
      <Typography>{data.maximumClinicalTrialPhase}</Typography>
      <LongText lineLimit="4">{data.description}</LongText>
      {data.indications && data.indications.rows.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Indications
          </Typography>
          {data.indications.rows.map((indication, index) => {
            return (
              <Fragment key={index}>
                <Link to={`/disease/${indication.disease.id}`}>
                  {indication.disease.name}
                </Link>{' '}
              </Fragment>
            );
          })}
        </>
      )}
      {data.linkedTargets.rows.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Drug targets
          </Typography>
          {data.linkedTargets.rows.map(target => (
            <Fragment key={target.id}>
              <Link to={`/target/${target.id}`}>{target.approvedSymbol}</Link>{' '}
            </Fragment>
          ))}
        </>
      )}
      {data.synonyms.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Synonyms
          </Typography>
          {data.synonyms.map(synonym => (
            <Chip
              key={synonym}
              className={classes.chip}
              label={synonym}
              variant="outlined"
            />
          ))}
        </>
      )}
      {data.tradeNames.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Trade names
          </Typography>
          {data.tradeNames.map(tradeName => (
            <Chip
              key={tradeName}
              className={classes.chip}
              label={tradeName}
              variant="outlined"
            />
          ))}
        </>
      )}
    </CardContent>
  );
};

export default withStyles(styles)(DrugDetail);
