import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  chip: { height: '20px', maxWidth: '100%' },
  link: {
    display: 'block',
    whiteSpace: 'unset',
  },
  subtitle: {
    fontWeight: 500,
  },
  icon: {
    verticalAlign: 'text-bottom',
  },
});

const useStyles = makeStyles(theme => {
  return {
    showMore: {
      whiteSpace: 'nowrap',
    },
    showMoreText: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  };
});

const TermList = ({ terms, render, maxTerms = 10 }) => {
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setShowMore(!showMore);
  };

  if (terms.length === 0) return null;

  const shownTerms = terms.slice(0, maxTerms);
  const hiddenTerms = terms.slice(maxTerms);
  return (
    <Fragment>
      {shownTerms.map(render)}
      {showMore && hiddenTerms.map(render)}
      {hiddenTerms.length > 0 && (
        <Typography
          variant="body2"
          className={classes.showMore}
          onClick={handleClick}
        >
          {showMore ? '' : '... '}[
          <span className={classes.showMoreText}>
            {showMore ? ' hide ' : ' show more '}
          </span>
          ]
        </Typography>
      )}
    </Fragment>
  );
};

const DrugDetail = ({ classes, data }) => {
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        <Link to={`/drug/${data.id}`}>{data.name}</Link>
      </Typography>
      <Typography color="primary">
        <DrugIcon className={classes.icon} /> Drug
      </Typography>
      <LongText lineLimit={4}>{data.description}</LongText>
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
      {data.indications && data.indications.rows.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Indications
          </Typography>
          <TermList
            terms={data.indications.rows}
            maxTerms={5}
            render={(indication, index) => {
              return (
                <Link
                  key={index}
                  className={classes.link}
                  to={`/disease/${indication.disease.id}`}
                >
                  {indication.disease.name}
                </Link>
              );
            }}
          />
        </>
      )}
      {data.linkedTargets.rows.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Drug targets
          </Typography>
          <TermList
            terms={data.linkedTargets.rows}
            maxTerms={5}
            render={target => {
              return (
                <Link
                  className={classes.link}
                  key={target.id}
                  to={`/target/${target.id}`}
                >
                  {target.approvedSymbol}
                </Link>
              );
            }}
          />
        </>
      )}
      {data.synonyms.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Synonyms
          </Typography>
          <TermList
            terms={data.synonyms}
            maxTerms={5}
            render={synonym => {
              return (
                <Chip
                  key={synonym}
                  className={classes.chip}
                  title={synonym}
                  label={synonym}
                  variant="outlined"
                  size="small"
                />
              );
            }}
          />
        </>
      )}
      {data.tradeNames.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Trade names
          </Typography>
          <TermList
            terms={data.tradeNames}
            maxTerms={5}
            render={tradeName => {
              return (
                <Chip
                  key={tradeName}
                  className={classes.chip}
                  title={tradeName}
                  label={tradeName}
                  variant="outlined"
                  size="small"
                />
              );
            }}
          />
        </>
      )}
    </CardContent>
  );
};

export default withStyles(styles)(DrugDetail);
