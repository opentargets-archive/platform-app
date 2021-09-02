export const definition = {
  id: 'geneticConstraint',
  name: 'Genetic Constraint',
  shortName: 'GC',
  hasData: ({ geneticConstraint }) => geneticConstraint.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
