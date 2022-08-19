export const definition = {
  id: 'safety',
  name: 'Safety',
  shortName: 'S',
  hasData: data => data.safetyLiabilities.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
