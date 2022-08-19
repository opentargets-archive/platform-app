export const definition = {
  id: 'chemicalProbes',
  name: 'Chemical Probes',
  shortName: 'CP',
  hasData: data => data.chemicalProbes.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
