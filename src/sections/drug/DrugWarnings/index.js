export const definition = {
  id: 'drugWarnings',
  name: 'Drug Warnings',
  shortName: 'DW',
  hasData: ({ drugWarnings }) => drugWarnings.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
