import React from 'react';

import Description from './Description';
import ProfileHeader from './ProfileHeader';
import Synonyms from './Synonyms';
import usePlatformApi from '../../hooks/usePlatformApi';

function DescriptionAndSynonyms() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) console.error(error);

  return (
    <ProfileHeader>
      <Description loading={loading}>{data?.disease.description}</Description>
      <Synonyms loading={loading}>{data?.disease.synonyms}</Synonyms>
    </ProfileHeader>
  );
}

export default DescriptionAndSynonyms;
