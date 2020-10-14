export const definition = {
  id: 'adverseEvents',
  name: 'Pharmacovigilance',
  shortName: 'P',
  hasData: data => data.adverseEvents.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
