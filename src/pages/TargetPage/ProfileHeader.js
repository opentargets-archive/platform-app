import React from 'react';
import { loader } from 'graphql.macro';

import {
  Description,
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';

const TARGET_PROFILE_HEADER_FRAGMENT = loader('./TargetProfileHeader.gql');

/*
 * Target synonyms from the API have a "label" and a "source"
 * and can be lister more than once, with different sources.
 * Parse synonyms to a unique list (label) where terms can have
 * multiple sources in a tooltip
 */
const parseSynonyms = synonyms => {
  const t = [];
  // Synonyms needs to be sorted by source in specific order
  // (order converted to a map for convenience when doing the sort)
  const sortingOrder = ['HGNC', 'uniprot', 'NCBI_entrez'].reduce(
    (acc, a, i) => ({ ...acc, [a]: i }),
    {}
  );

  const sources = {
    HGNC: 'HGNC',
    uniprot: 'UniProt',
    NCBI_entrez: 'Entrez',
  };

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
  t.sort(
    (a, b) =>
      (sortingOrder[a.tooltip[0]] || -1) - (sortingOrder[b.tooltip[0]] || -1)
  );

  t.forEach(
    syn =>
      (syn.tooltip = 'Source: ' + syn.tooltip.map(s => sources[s]).join(', '))
  );
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
