export const definition = {
  id: 'tractability',
  name: 'Tractability',
  shortName: 'TR',
  hasData: data => data.tractability?.length > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
