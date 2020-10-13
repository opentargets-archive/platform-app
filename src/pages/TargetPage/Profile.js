import React from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';

import sections from './sections';
import SummaryContainer from '../../components/Summary/SummaryContainer';
import SectionContainer from '../../components/Section/SectionContainer';

const TARGET_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
  sections,
  'Target'
);
const TARGET_PROFILE_QUERY = gql`
  query TargetProfileQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      ...TargetProfileHeaderFragment
      ...TargetProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${TARGET_PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ ensgId, approvedSymbol }) {
  return (
    <PlatformApiProvider
      entity="target"
      query={TARGET_PROFILE_QUERY}
      variables={{ ensgId }}
    >
      <ProfileHeader />

      <SummaryContainer>
        {sections.map(({ Summary, definition }) => (
          <Summary
            key={definition.id}
            ensgId={ensgId}
            label={approvedSymbol}
            definition={definition}
          />
        ))}
      </SummaryContainer>

      <SectionContainer>
        {sections.map(({ Body, definition }) => (
          <Body
            key={definition.id}
            ensgId={ensgId}
            label={approvedSymbol}
            definition={definition}
          />
        ))}
      </SectionContainer>
    </PlatformApiProvider>
  );
}

export default Profile;
