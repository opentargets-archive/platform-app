import React from 'react';
import { faDna, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gql } from '@apollo/client';
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Link } from 'ot-ui';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';
import { Skeleton } from '@material-ui/lab';

const EVIDENCE_PROFILE_TARGET_HEADER_FRAGMENT = gql`
  fragment EvidenceProfileTargetHeaderFragment on Target {
    id
    approvedSymbol
    proteinAnnotations {
      id
      functions
    }
    symbolSynonyms
  }
`;
const EVIDENCE_PROFILE_DISEASE_HEADER_FRAGMENT = gql`
  fragment EvidenceProfileDiseaseHeaderFragment on Disease {
    id
    name
    description
    synonyms
  }
`;

const useStyles = makeStyles(theme => ({
  card: { height: '100%' },
  cardContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}));

function ProfileHeader() {
  const classes = useStyles();
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const {
    id: efoId,
    name,
    description: diseaseDescription,
    synonyms: diseaseSynonyms,
  } = data?.disease || {};
  const targetDescription = data?.target.proteinAnnotations?.functions?.[0];
  const { id: ensgId, approvedSymbol, symbolSynonyms: targetSynonyms } =
    data?.target || {};

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
            <ChipList title="Synonyms">{diseaseSynonyms}</ChipList>
          </CardContent>
        </Card>
      )}
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeaderTarget: EVIDENCE_PROFILE_TARGET_HEADER_FRAGMENT,
  profileHeaderDisease: EVIDENCE_PROFILE_DISEASE_HEADER_FRAGMENT,
};

export default ProfileHeader;
