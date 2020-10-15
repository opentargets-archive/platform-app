export const definition = {
  id: 'chemicalProbes',
  name: 'Chemical Probes',
  shortName: 'CP',
  hasData: data =>
    data.chemicalProbes?.rows.length || data.chemicalProbes?.probeminer,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
