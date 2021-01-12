import React from 'react';
import { gql } from '@apollo/client';

import {
  ChipList,
  Description,
  Field,
  ProfileHeader as BaseProfileHeader,
} from '../../components/ProfileHeader';
import Smiles from './Smiles';
import usePlatformApi from '../../hooks/usePlatformApi';
import WithdrawnNotice from '../../components/WithdrawnNotice';

const DRUG_PROFILE_HEADER_FRAGMENT = gql`
  fragment DrugProfileHeaderFragment on Drug {
    description
    drugType
    synonyms
    hasBeenWithdrawn
    maximumClinicalTrialPhase
    tradeNames
    withdrawnNotice {
      classes
      countries
      reasons
      year
    }
    yearOfFirstApproval
  }
`;

function ProfileHeader({ chemblId }) {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const {
    description,
    synonyms,
    tradeNames,
    withdrawnNotice,
    drugType,
    yearOfFirstApproval,
    maximumClinicalTrialPhase,
  } = data?.drug || {};

  return (
    <BaseProfileHeader>
      <>
        <Description loading={loading}>{description}</Description>
        <WithdrawnNotice withdrawnNotice={withdrawnNotice} />

        <Field loading={loading} title="Molecule type">
          {drugType}
        </Field>
        <Field loading={loading} title="First approval">
          {yearOfFirstApproval || 'N/A'}
        </Field>
        <Field loading={loading} title="Max phase">
          {maximumClinicalTrialPhase}
        </Field>
        <ChipList title="Synonyms" inline loading={loading}>
          {synonyms}
        </ChipList>
        <ChipList title="Known trade names" inline loading={loading}>
          {tradeNames}
        </ChipList>
      </>
      <Smiles chemblId={chemblId} />
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: DRUG_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
