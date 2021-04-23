export const definition = {
  id: 'clinGen',
  name: 'ClinGen',
  shortName: 'CG',
  hasData: data => data.clingenSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
