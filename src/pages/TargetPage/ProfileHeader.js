import React from 'react';
import { gql } from '@apollo/client';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
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
      <ChipList title="Synonyms" loading={loading}>
        {synonyms}
      </ChipList>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
