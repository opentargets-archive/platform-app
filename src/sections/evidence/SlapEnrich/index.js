export const definition = {
  id: 'slapEnrich',
  name: 'SlapEnrich',
  shortName: 'SE',
  hasData: data => data.slapEnrich.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
