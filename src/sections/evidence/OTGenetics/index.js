export const definition = {
  id: 'otGenetics',
  name: 'Open Targets Genetics',
  shortName: 'OG',
  hasData: data => data.openTargetsGenetics.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
