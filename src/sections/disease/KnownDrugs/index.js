export const definition = {
  id: 'knownDrugs',
  name: 'Known Drugs',
  shortName: 'KD',
  hasData: data => data.knownDrugs?.count > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
