import React from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';

import sections from './sections';
import SummaryContainer from '../../components/Summary/SummaryContainer';
import SectionContainer from '../../components/Section/SectionContainer';

const PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(sections, 'Drug');
const PROFILE_QUERY = gql`
  query DrugProfileQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      ...DrugProfileHeaderFragment
      ...DrugProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ match }) {
  const { chemblId } = match.params;

  return (
    <PlatformApiProvider
      entity="drug"
      query={PROFILE_QUERY}
      variables={{ chemblId }}
    >
      <ProfileHeader chemblId={chemblId} />

      <SummaryContainer>
        {sections.map(({ Summary, definition }) => (
          <Summary
            key={definition.id}
            chemblId={chemblId}
            definition={definition}
          />
        ))}
      </SummaryContainer>

      <SectionContainer>
        {sections.map(({ Body, definition }) => (
          <Body
            key={definition.id}
            chemblId={chemblId}
            definition={definition}
          />
        ))}
      </SectionContainer>
    </PlatformApiProvider>
  );
}

export default Profile;
