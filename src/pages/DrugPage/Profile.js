import React from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';

import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const DRUG_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(sections, 'Drug');
const DRUG_PROFILE_QUERY = gql`
  query DrugProfileQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      ...DrugProfileHeaderFragment
      ...DrugProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${DRUG_PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ chemblId, name }) {
  return (
    <PlatformApiProvider
      entity="drug"
      query={DRUG_PROFILE_QUERY}
      variables={{ chemblId }}
    >
      <ProfileHeader chemblId={chemblId} />
      <SectionOrderProvider sections={sections}>
        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              id={chemblId}
              label={name}
              definition={definition}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body
              key={definition.id}
              id={chemblId}
              label={name}
              definition={definition}
            />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;
