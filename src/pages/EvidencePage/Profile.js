import React from 'react';
import { gql } from '@apollo/client';

// import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

// const EVIDENCE_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
//   sections,
//   'Evidence'
// );
const EVIDENCE_PROFILE_QUERY = gql`
  query EvidenceProfileQuery($ensgId: String!, $efoId: String!) {
    target(ensemblId: $ensgId) {
      id
      ...EvidenceProfileTargetHeaderFragment
    }
    disease(efoId: $efoId) {
      id
      ...EvidenceProfileDiseaseHeaderFragment
    }
    # evidence(ensgId: $ensgId, efoId: $efoId) {
    #   id
    #   ...EvidenceProfileSummaryFragment
    # }
  }
  ${ProfileHeader.fragments.profileHeaderTarget}
  ${ProfileHeader.fragments.profileHeaderDisease}
`;
// ${EVIDENCE_PROFILE_SUMMARY_FRAGMENT}

function Profile({ match }) {
  const { ensgId, efoId } = match.params;

  return (
    <PlatformApiProvider
      entity="evidence"
      query={EVIDENCE_PROFILE_QUERY}
      variables={{ ensgId, efoId }}
    >
      <SectionOrderProvider sections={sections}>
        <ProfileHeader />

        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              efoId={efoId}
              definition={definition}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body key={definition.id} efoId={efoId} definition={definition} />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;
