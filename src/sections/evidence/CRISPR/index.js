export const definition = {
  id: 'crispr',
  name: 'Project Score',
  shortName: 'PS',
  hasData: ({ crisprSummary }) => crisprSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
