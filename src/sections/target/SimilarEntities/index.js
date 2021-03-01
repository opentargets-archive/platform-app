export const definition = {
  id: 'similarentities',
  name: 'Similar Entities',
  shortName: 'SE',
  hasData: data => (data.similarW2VEntities?.length || 0) > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
