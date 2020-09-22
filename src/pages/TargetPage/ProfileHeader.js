import React from 'react';
import { gql } from '@apollo/client';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  Synonyms,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const PROFILE_HEADER_FRAGMENT = gql`
  fragment TargetProfileHeaderFragment on Target {
    proteinAnnotations {
      id
      functions
    }
    symbolSynonyms
  }
`;

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const description = data?.target.proteinAnnotations?.functions?.[0];
  const synonyms = data?.target.symbolSynonyms;

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{description}</Description>
      <Synonyms loading={loading}>{synonyms}</Synonyms>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
