import React from 'react';
import { gql } from '@apollo/client';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  Synonyms,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const PROFILE_HEADER_FRAGMENT = gql`
  fragment DiseaseProfileHeaderFragment on Disease {
    description
    synonyms
  }
`;

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{data?.disease.description}</Description>
      <Synonyms loading={loading}>{data?.disease.synonyms}</Synonyms>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
