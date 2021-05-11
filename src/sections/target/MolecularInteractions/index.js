export const definition = {
  id: 'interactions',
  name: 'Molecular Interactions',
  shortName: 'MI',
  hasData: data => data.interactions?.count > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
