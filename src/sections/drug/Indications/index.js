export const definition = {
  id: 'indications',
  name: 'Indications',
  shortName: 'I',
  hasData: data => data.indications?.count > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
