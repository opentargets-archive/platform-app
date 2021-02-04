import React from 'react';
import { gql } from '@apollo/client';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const DISEASE_PROFILE_HEADER_FRAGMENT = gql`
  fragment DiseaseProfileHeaderFragment on Disease {
    description
    synonyms {
      # relation
      terms
    }
  }
`;

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{data?.disease.description}</Description>
      <ChipList title="Synonyms" loading={loading}>
        {data?.disease.synonyms
          ?.map(s => s.terms)
          .reduce((acc, val) => acc.concat(val), [])}
      </ChipList>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: DISEASE_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
