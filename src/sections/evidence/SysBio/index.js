export const definition = {
  id: 'sysBio',
  name: 'Systems Biology',
  shortName: 'SB',
  hasData: data => data.sysBio.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
