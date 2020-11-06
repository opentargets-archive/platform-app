export const definition = {
  id: 'phenodigm',
  name: 'Phenodigm',
  shortName: 'PH',
  hasData: data => data.phenodigm.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
