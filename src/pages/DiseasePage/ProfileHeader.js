import React from 'react';
import { loader } from 'graphql.macro';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const DISEASE_PROFILE_HEADER_FRAGMENT = loader('./ProfileHeader.gql');

/**
 * Disease synonyms are organized by "relation", each with a list of "terms".
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
        // if it already exist, just add the relation to it
        // (i.e. it will have multiple relations)
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
  const diseaseSynonyms = parseSynonyms(data?.disease.synonyms || []);

  //TODO: Errors!
  if (error) return null;

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{data?.disease.description}</Description>
      {diseaseSynonyms.length > 0 ? (
        <ChipList title="Synonyms" loading={loading}>
          {diseaseSynonyms}
        </ChipList>
      ) : null}
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: DISEASE_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
