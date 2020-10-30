export const definition = {
  id: 'geneOntology',
  name: 'Gene Ontology',
  shortName: 'GO',
  hasData: data => data.geneOntology.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
