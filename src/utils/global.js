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
