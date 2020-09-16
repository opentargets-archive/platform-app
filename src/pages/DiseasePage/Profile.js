import React from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import { DescriptionAndSynonyms } from '../../components/ProfileHeader';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import SectionContainer from '../../components/Section/SectionContainer';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(sections, 'Disease');
const PROFILE = gql`
  query ProfileQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
      ...ProfileSummaryFragment
      ...ProfileHeaderFragment
    }
  }
  ${PROFILE_SUMMARY_FRAGMENT}
  ${DescriptionAndSynonyms.fragments.profileHeader}
`;

function Profile({ efoId }) {
  return (
    <PlatformApiProvider entity="disease" query={PROFILE} variables={{ efoId }}>
      <DescriptionAndSynonyms />

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
