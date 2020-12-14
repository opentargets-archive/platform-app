export const definition = {
  id: 'uniprotLiterature',
  name: 'UniProt literature',
  shortName: 'UL',
  hasData: ({ uniprotLiteratureSummary }) => uniprotLiteratureSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
