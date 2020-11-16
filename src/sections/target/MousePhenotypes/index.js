export const definition = {
  id: 'mousePhenotypes',
  name: 'Mouse Phenotypes',
  shortName: 'MP',
  hasData: data => data.mousePhenotypes.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
