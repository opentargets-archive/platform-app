import React, { useState } from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const EVIDENCE_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
  sections,
  'Disease',
  'EvidenceProfileSummaryFragment'
);

const EVIDENCE_PROFILE_QUERY = gql`
  query EvidenceProfileQuery($ensgId: String!, $efoId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
      proteinAnnotations {
        id
        functions
      }
      symbolSynonyms
      nameSynonyms
      pmtl_fda_designation
    }
    disease(efoId: $efoId) {
      id
      name
      description
      synonyms {
        terms
        relation
      }
      ...EvidenceProfileSummaryFragment
    }
  }
  ${EVIDENCE_PROFILE_SUMMARY_FRAGMENT}
`;


function Profile({ ensgId, efoId, symbol, name }) {

// display settings for data from external source 
// display the sections if section.definition.id is presented in the  displaySettingsForExternal array
const [displaySettingsForExternal, setDisplaySettingsForExternal] = useState([]);
  return (
    <PlatformApiProvider
      entity="disease"
      query={EVIDENCE_PROFILE_QUERY}
      variables={{ ensgId, efoId }}
    >
      <SectionOrderProvider sections={sections} displaySettingsForExternal={displaySettingsForExternal}>
        <ProfileHeader />

        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              id={{ ensgId, efoId }}
              label={{ symbol, name }}
              definition={definition}
              displaySettingsForExternal={displaySettingsForExternal}
              updateDisplaySettingsForExternal = {setDisplaySettingsForExternal}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body
              key={definition.id}
              id={{ ensgId, efoId }}
              label={{ symbol, name }}
              definition={definition}
            />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;
