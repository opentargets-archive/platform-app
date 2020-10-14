export const definition = {
  id: 'ontology',
  name: 'Ontology',
  shortHand: 'O',
  // All terms are in the ontology.
  hasData: () => true,
  external: true,
};

export { default as Body } from './Body';
export { default as Summary } from './Summary';
