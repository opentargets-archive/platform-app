import React from 'react';
import { gql } from '@apollo/client';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
// import ChipList from '../../components/ChipList';
import usePlatformApi from '../../hooks/usePlatformApi';

const DISEASE_PROFILE_HEADER_FRAGMENT = gql`
  fragment DiseaseProfileHeaderFragment on Disease {
    description
    synonyms {
      relation
      terms
    }
  }
`;

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const synonyms = data?.disease.synonyms
    ?.map(s => {
      return s.terms.map(syn => ({ label: syn, tooltip: s.relation }));
    })
    .reduce((acc, val) => acc.concat(val), []);

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{data?.disease.description}</Description>
      <ChipList title="Synonyms" loading={loading}>
        {synonyms}
      </ChipList>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: DISEASE_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
