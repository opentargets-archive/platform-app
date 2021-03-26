export const definition = {
  id: 'drugWarnings',
  name: 'Drug Warnings',
  shortName: 'DW',
  hasData: ({ hasBeenWithdrawn, blackBoxWarning }) =>
    hasBeenWithdrawn || blackBoxWarning,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
