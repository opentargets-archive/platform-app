export const definition = {
  id: 'ot_crispr',
  name: 'Open Targets CRISPR',
  shortName: 'OT',
  hasData: ({ OtCrisprSummary }) => OtCrisprSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
