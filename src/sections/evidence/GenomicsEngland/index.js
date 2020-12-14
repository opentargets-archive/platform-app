export const definition = {
  id: 'genomicsEngland',
  name: 'GEL PanelApp',
  shortName: 'GE',
  hasData: data => data.genomicsEngland.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
