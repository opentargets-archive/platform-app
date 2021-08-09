import React from 'react';
import { loader } from 'graphql.macro';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const TARGET_PROFILE_HEADER_FRAGMENT = loader('./TargetProfileHeader.gql');

/**
 * Target synonyms from the API have a "label" and a "source"
 * and can be lister more than once, with different sources.
 * Parse synonyms to a unique list (label) where terms can have
 * multiple sources in a tooltip
 */
const parseSynonyms = synonyms => {
  const t = [];
  synonyms.forEach(s => {
    const thisSyn = t.find(
      t => t.label.toLowerCase() === s.label.toLowerCase()
    );
    if (!thisSyn) {
      t.push({ label: s.label, tooltip: [s.source] });
    } else {
      // if the synonym is already in the list,
      // just add the source to its tooltip
      thisSyn.tooltip.push(s.source);
    }
  });
  // Tooltip component needs a string to display correctly
  t.forEach(syn => (syn.tooltip = syn.tooltip.join(', ')));
  return t;
};

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const description = data?.target.proteinAnnotations?.functions?.[0];
  const synonyms = parseSynonyms(data?.target.synonyms || []);

  return (
    <BaseProfileHeader>
      <Description loading={loading}>{description}</Description>
      <ChipList title="Synonyms" loading={loading}>
        {synonyms}
      </ChipList>
    </BaseProfileHeader>
  );
}

ProfileHeader.fragments = {
  profileHeader: TARGET_PROFILE_HEADER_FRAGMENT,
};

export default ProfileHeader;
