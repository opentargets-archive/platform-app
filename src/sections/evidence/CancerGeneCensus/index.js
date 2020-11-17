export const definition = {
  id: 'cancerGeneCensus',
  name: 'Cancer Gene Census',
  shortName: 'CC',
  hasData: ({ cancerGeneCensusSummary }) => cancerGeneCensusSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
