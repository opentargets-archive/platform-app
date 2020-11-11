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
