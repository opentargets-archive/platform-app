import React from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SectionContainer from '../../components/Section/SectionContainer';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(sections, 'Disease');
const PROFILE_QUERY = gql`
  query ProfileQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
      ...DiseaseProfileHeaderFragment
      ...DiseaseProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ efoId, name }) {
  return (
    <PlatformApiProvider
      entity="disease"
      query={PROFILE_QUERY}
      variables={{ efoId }}
    >
      <ProfileHeader />

      <SummaryContainer>
        {sections.map(({ Summary, definition }) => (
          <Summary key={definition.id} efoId={efoId} definition={definition} />
        ))}
      </SummaryContainer>

      <SectionContainer>
        {sections.map(({ Body, definition }) => (
          <Body key={definition.id} efoId={efoId} definition={definition} />
        ))}
      </SectionContainer>
    </PlatformApiProvider>
  );
}

export default Profile;
