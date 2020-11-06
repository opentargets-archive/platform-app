export const definition = {
  id: 'crispr',
  name: 'CRISPR',
  shortName: 'CR',
  hasData: ({ crisprSummary }) => crisprSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
