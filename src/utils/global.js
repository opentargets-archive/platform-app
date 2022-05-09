import { format } from 'd3-format';
import config from '../config';

export const safeToString = x => {
  switch (typeof x) {
    case 'object':
      return 'object';
    case 'function':
      return 'function';
    case undefined:
    case null:
      return '';
    default:
      return x + '';
  }
};

export const identifiersOrgLink = (prefix, accession, resource) =>
  `https://identifiers.org/${
    resource ? resource + '/' : ''
  }${prefix}:${accession}`;

export const literatureUrl = id =>
  id.startsWith('PMC')
    ? identifiersOrgLink('pmc', id)
    : identifiersOrgLink('pubmed', id);

export const sentenceCase = str =>
  str
    ? str.charAt(0).toUpperCase() +
      str
        .slice(1)
        .replace(/_/g, ' ')
        .toLocaleLowerCase()
    : str;

export const formatComma = format(',');

export function getUniprotIds(proteinIds) {
  return proteinIds
    .filter(proteinId => proteinId.source === 'uniprot_swissprot')
    .map(proteinId => proteinId.id);
}

// TODO: Replace this with PublicationsDrawer component
const makePmidLink = themeColor => {
  const linkStyles = `color: ${themeColor}; font-size: inherit; text-decoration: none;`;
  return match => {
    const id = match.substring(7);
    return `PubMed:<a style="${linkStyles}" href="https://europepmc.org/abstract/med/${id}" target="_blank">${id}</a>`;
  };
};

export function clearDescriptionCodes(descriptions, themeColor) {
  if (!descriptions) return [];
  return descriptions.map(desc => {
    const codeStart = desc.indexOf('{');
    const parsedDesc = desc.slice(0, codeStart);
    return parsedDesc.replace(/Pubmed:\d+/gi, makePmidLink(themeColor));
  });
}

export async function fetcher(graphQLParams) {
  const data = await fetch(config.urlApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphQLParams),
  });
  return data.json();
}
