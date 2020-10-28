export const definition = {
  id: 'proteinInformation',
  name: 'Protein Information',
  shortName: 'PI',
  hasData: data =>
    data.proteinAnnotations?.subcellularLocations.length > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
