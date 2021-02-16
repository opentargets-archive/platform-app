import React from 'react';
import { gql } from '@apollo/client';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const DISEASE_PROFILE_HEADER_FRAGMENT = gql`
  fragment DiseaseProfileHeaderFragment on Disease {
    description
    synonyms {
      relation
      terms
    }
  }
`;

/**
 * Synonyms are organized by "relation", each with a list of "terms".
 * The same term can appear under different relations.
 */
const parseSynonyms = diseaseSynonyms => {
  const t = [];
  diseaseSynonyms.forEach(s => {
    s.terms.forEach(syn => {
      const thisSyn = t.find(t => t.label === syn);
      if (!thisSyn) {
        // if the synonyms is not already in the list, we add it
        t.push({ label: syn, tooltip: [s.relation] });
      } else {
        // if it already exist, just add the relation
        // to the array to be displayed in the tooltip
        thisSyn.tooltip.push(s.relation);
      }
    });
  });
  // convert the tooltip array to a string for display in the Tooltip component
  t.forEach(syn => (syn.tooltip = syn.tooltip.join(', ')));
  return t;
};

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{data?.disease.description}</Description>
      <ChipList title="Synonyms" loading={loading}>
        {parseSynonyms(data?.disease.synonyms || [])}
      </ChipList>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: DISEASE_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
