import React from 'react';
import { CardContent, makeStyles, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';

import Chip from '../../components/Chip';
import Link from '../../components/Link';
import LongList from '../../components/LongList';
import LongText from '../../components/LongText';

const useStyles = makeStyles({
  link: {
    display: 'block',
  },
  subtitle: {
    fontWeight: 500,
  },
  warningIcon: {
    position: 'relative',
    top: '5px',
  },
});

const DrugDetail = ({ data }) => {
  const classes = useStyles();
  return (
    <CardContent>
      <Typography color="primary" variant="h5">
        <Link to={`/drug/${data.id}`}>{data.name}</Link>
      </Typography>
      <Typography color="primary">
        <FontAwesomeIcon icon={faPrescriptionBottleAlt} /> Drug
      </Typography>
      <LongText lineLimit={4}>{data.description}</LongText>
      {data.hasBeenWithdrawn ? (
        <Typography variant="subtitle2" color="secondary">
          <WarningIcon className={classes.warningIcon} /> Withdrawn Drug
        </Typography>
      ) : null}
      <Typography className={classes.subtitle} variant="subtitle1">
        Drug Type
      </Typography>
      <Typography variant="body2">{data.drugType}</Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        Maximum Clinical Trial Phase
      </Typography>
      <Typography variant="body2">{data.maximumClinicalTrialPhase}</Typography>
      {data.indications && data.indications.rows.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Indications
          </Typography>
          <LongList
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
          <LongList
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
          <LongList
            terms={data.synonyms}
            maxTerms={5}
            render={synonym => (
              <Chip key={synonym} title={synonym} label={synonym} />
            )}
          />
        </>
      )}
      {data.tradeNames.length > 0 && (
        <>
          <Typography className={classes.subtitle} variant="subtitle1">
            Trade names
          </Typography>
          <LongList
            terms={data.tradeNames}
            maxTerms={5}
            render={tradeName => (
              <Chip key={tradeName} title={tradeName} label={tradeName} />
            )}
          />
        </>
      )}
    </CardContent>
  );
};

export default DrugDetail;
