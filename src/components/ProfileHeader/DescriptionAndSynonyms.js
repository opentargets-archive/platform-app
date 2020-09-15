import React from 'react';

import Description from './Description';
import ProfileHeader from './ProfileHeader';
import Synonyms from './Synonyms';

function DescriptionAndSynonyms({ loading, description, synonyms }) {
  return (
    <ProfileHeader>
      <Description loading={loading}>{description}</Description>
      <Synonyms loading={loading}>{synonyms}</Synonyms>
    </ProfileHeader>
  );
}

export default DescriptionAndSynonyms;
