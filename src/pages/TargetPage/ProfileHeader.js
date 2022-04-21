import React from 'react';
import { loader } from 'graphql.macro';
import TargetDescription from './TargetDescription';
import {
  ProfileHeader as BaseProfileHeader,
  ChipList,
} from '../../components/ProfileHeader';
import usePlatformApi from '../../hooks/usePlatformApi';
import { clearDescriptionCodes } from '../../utils/global';
import { useTheme } from '@material-ui/core/styles';

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

function ProfileHeader() {
  const { loading, error, data } = usePlatformApi();
  const theme = useTheme();

  //TODO: Errors!
  if (error) return null;

  const targetDescription = clearDescriptionCodes(
    data?.target.functionDescriptions,
    theme.palette.primary.main
  );
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
