export const definition = {
  id: 'bibliography1',
  name: 'Bibliography',
  shortName: 'B',
  hasData: data => (data.similarEntities?.length || 0) > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
