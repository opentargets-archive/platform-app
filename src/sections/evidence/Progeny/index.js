export const definition = {
  id: 'progeny',
  name: 'PROGENy',
  shortName: 'PY',
  hasData: data => data.progeny.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
