export const definition = {
  id: 'impc',
  name: 'IMPC',
  shortName: 'IM',
  hasData: data => data.impc.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
