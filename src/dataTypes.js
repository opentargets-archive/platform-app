const dataTypes = [
  { id: 'genetic_association', label: 'Genetic associations' },
  { id: 'somatic_mutation', label: 'Somatic mutations' },
  { id: 'known_drug', label: 'Drugs' },
  { id: 'affected_pathway', label: 'Pathways & systems biology' },
  { id: 'literature', label: 'Text mining' },
  { id: 'rna_expression', label: 'RNA expression' },
  { id: 'animal_model', label: 'Animal models' },
];

const dataTypesMap = dataTypes.reduce((acc, dataType) => {
  acc[dataType.id] = dataType.label;
  return acc;
}, {});

export { dataTypesMap };

export default dataTypes;
