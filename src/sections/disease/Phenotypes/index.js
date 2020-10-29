export const definition = {
  id: 'phenotypes',
  name: 'Phenotypes',
  shortName: 'PH',
  hasData: data => data.phenotypes.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
