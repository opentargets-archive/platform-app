export const definition = {
  id: 'europePmc',
  name: 'Europe PMC',
  shortName: 'EP',
  hasData: data => data.europePmc.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
