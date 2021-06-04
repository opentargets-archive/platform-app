import React, { useEffect } from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const DISEASE_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
  sections,
  'Disease'
);
const DISEASE_PROFILE_QUERY = gql`
  query DiseaseProfileQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      ...DiseaseProfileHeaderFragment
      ...DiseaseProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${DISEASE_PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ efoId, name }) {
  useEffect(() => {
    let isCurrent = true;

    setTimeout(() => {
      if (isCurrent) {
        const { hash } = window.location;
        const el = document.getElementById(hash.slice(1));
        el.scrollIntoView();
      }
    }, 500);

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <PlatformApiProvider
      entity="disease"
      query={DISEASE_PROFILE_QUERY}
      variables={{ efoId }}
    >
      <SectionOrderProvider sections={sections}>
        <ProfileHeader />

        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              id={efoId}
              label={name}
              definition={definition}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body
              key={definition.id}
              id={efoId}
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
