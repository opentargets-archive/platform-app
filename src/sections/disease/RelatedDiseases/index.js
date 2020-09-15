export const definition = {
  id: 'relatedDiseases',
  name: 'Related Diseases or Phenotypes',
  shortName: 'RD',
  hasData: data => data.relatedDiseases.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
