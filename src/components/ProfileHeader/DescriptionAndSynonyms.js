import React from 'react';
import { gql } from '@apollo/client';

import Description from './Description';
import ProfileHeader from './ProfileHeader';
import Synonyms from './Synonyms';
import usePlatformApi from '../../hooks/usePlatformApi';

const HEADER_FRAGMENT = gql`
  fragment ProfileHeaderFragment on Disease {
    description
    synonyms
  }
`;

function DescriptionAndSynonyms() {
  const { loading, error, data, entity } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  return (
    <ProfileHeader>
      <Description loading={loading}>{data?.[entity].description}</Description>
      <Synonyms loading={loading}>{data?.[entity].synonyms}</Synonyms>
    </ProfileHeader>
  );
}

DescriptionAndSynonyms.fragments = {
  profileHeader: HEADER_FRAGMENT,
};

export default DescriptionAndSynonyms;
