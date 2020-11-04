export const definition = {
  id: 'gene2Phenotype',
  name: 'Gene2Phenotype',
  shortName: 'GP',
  hasData: data => data.gene2Phenotype.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
