export const definition = {
  id: 'adverseEvents',
  name: 'Pharmacovigilance',
  shortName: 'PV',
  hasData: data => data.adverseEvents?.count > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
