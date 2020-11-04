export const definition = {
  id: 'genomicsEngland',
  name: 'Genomics England',
  shortName: 'GE',
  hasData: data => data.genomicsEngland.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
