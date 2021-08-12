import React from 'react';
import { faDna, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import Link from '../../components/Link';
import { Skeleton } from '@material-ui/lab';
import usePlatformApi from '../../hooks/usePlatformApi';

const useStyles = makeStyles(theme => ({
  card: { height: '100%' },
  cardContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}));

/**
 * Disease synonyms are organized by "relation", each with a list of "terms".
 * The same term can appear under different relations.
 */
const parseSynonyms = diseaseSynonyms => {
  const t = [];
  diseaseSynonyms.forEach(s => {
    s.terms.forEach(syn => {
      const thisSyn = t.find(t => t.label === syn);
      if (!thisSyn) {
        // if the synonyms is not already in the list, we add it
        t.push({ label: syn, tooltip: [s.relation] });
      } else {
        // if it already exist, just add the relation to it
        // (i.e. it will have multiple relations)
        thisSyn.tooltip.push(s.relation);
      }
    });
  });
  // convert the tooltip array to a string for display in the Tooltip component
  t.forEach(syn => (syn.tooltip = syn.tooltip.join(', ')));
  return t;
};

function ProfileHeader() {
  const classes = useStyles();
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const { id: efoId, name, description: diseaseDescription } =
    data?.disease || {};
  const targetDescription = data?.target.functionDescriptions?.[0];

  const diseaseSynonyms = parseSynonyms(data?.disease.synonyms || []);

  const { id: ensgId, approvedSymbol } = data?.target || {};

  const targetSynonyms = data?.target?.synonyms?.reduce(
    (accumulator, synonymous) => {
      if (accumulator.find(x => x.label === synonymous.label)) {
        return accumulator;
      }
      accumulator.push({
        ...synonymous,
        tooltip: synonymous.label,
      });
      return accumulator;
    },
    []
  );

  return (
    <BaseProfileHeader>
      {loading ? (
        <Skeleton variant="rect" height="15rem" />
      ) : (
        <Card className={classes.card} elevation={0}>
          <CardHeader
            title={
              <Typography variant="h4">
                <Link to={`/target/${ensgId}`}>
                  <FontAwesomeIcon icon={faDna} /> {approvedSymbol}
                </Link>
              </Typography>
            }
          />
          <CardContent className={classes.cardContent}>
            <Description>{targetDescription}</Description>
            <ChipList title="Synonyms">{targetSynonyms}</ChipList>
          </CardContent>
        </Card>
      )}
      {loading ? (
        <Skeleton variant="rect" height="15rem" />
      ) : (
        <Card className={classes.card} elevation={0}>
          <CardHeader
            title={
              <Typography variant="h4">
                <Link to={`/disease/${efoId}`}>
                  <FontAwesomeIcon icon={faStethoscope} /> {name}
                </Link>
              </Typography>
            }
          />
          <CardContent className={classes.cardContent}>
            <Description>{diseaseDescription}</Description>
            {diseaseSynonyms.length > 0 ? (
              <ChipList title="Synonyms">{diseaseSynonyms}</ChipList>
            ) : null}
          </CardContent>
        </Card>
      )}
    </BaseProfileHeader>
  );
}

export default ProfileHeader;
