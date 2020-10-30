import React from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SummaryContainer from '../../components/Summary/SummaryContainer';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';

import sections from './sections';

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

function Profile({ ensgId, symbol }) {
  return (
    <PlatformApiProvider
      entity="target"
      query={TARGET_PROFILE_QUERY}
      variables={{ ensgId }}
    >
      <SectionOrderProvider sections={sections}>
        <ProfileHeader />
        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              id={ensgId}
              label={symbol}
              definition={definition}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body
              key={definition.id}
              id={ensgId}
              label={symbol}
              definition={definition}
            />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;
