export const definition = {
  id: 'chembl',
  name: 'ChEMBL',
  shortName: 'CE',
  hasData: data => data.chemblSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
