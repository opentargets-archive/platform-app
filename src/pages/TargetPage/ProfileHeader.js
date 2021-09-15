import React from 'react';
import { loader } from 'graphql.macro';
import TargetDescription from './TargetDescription';
import {
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
  const sources = {
    HGNC: 'HGNC',
    uniprot: 'UniProt',
    NCBI_entrez: 'Entrez',
  };
  // Synonyms needs to be sorted by source in specific order
  // (order converted to a map for convenience when doing the sort)
  const sortingOrder = ['HGNC', 'uniprot', 'NCBI_entrez'].reduce(
    (acc, a, i) => ({ ...acc, [a]: i }),
    {}
  );
  const sortedSynonyms = synonyms
    .slice()
    .sort((a, b) => sortingOrder[a.source] - sortingOrder[b.source]);

  const parsedSynonyms = [];

  sortedSynonyms.forEach(s => {
    const thisSyn = parsedSynonyms.find(
      parsedSynonyms =>
        parsedSynonyms.label.toLowerCase() === s.label.toLowerCase()
    );
    if (!thisSyn) {
      parsedSynonyms.push({ label: s.label, tooltip: [s.source] });
    } else {
      // if synonym already in the list add the source to its tooltip
      thisSyn.tooltip.push(s.source);
    }
  });

  parsedSynonyms.forEach(
    syn =>
      (syn.tooltip = 'Source: ' + syn.tooltip.map(s => sources[s]).join(', '))
  );

  return parsedSynonyms;
};

// TODO: Replace this with PublicationsDrawer component
function makePmidLink(match) {
  const id = match.substring(7);
  const linkStyles =
    'color: #3489ca; font-size: inherit; text-decoration: none;';
  return `PubMed:<a style="${linkStyles}" href="https://europepmc.org/abstract/med/${id}" target="_blank">${id}</a>`;
}

function clearCodes(descriptions) {
  if (!descriptions) return [];
  return descriptions.map(desc => {
    const codeStart = desc.indexOf('{');
    const parsedDesc = desc.slice(0, codeStart);
    return parsedDesc.replace(/Pubmed:\d+/gi, makePmidLink);
  });
}

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();

  //TODO: Errors!
  if (error) return null;

  const targetDescription = clearCodes(data?.target.functionDescriptions);
  const synonyms = parseSynonyms(data?.target.synonyms || []);

  return (
    <BaseProfileHeader>
      <TargetDescription
        loading={loading}
        descriptions={targetDescription}
        targetId={data?.target.id}
      />
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
