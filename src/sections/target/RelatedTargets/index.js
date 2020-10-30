export const definition = {
  id: 'relatedTargets',
  name: 'Related Targets',
  shortName: 'RT',
  hasData: data => data.relatedTargets?.count > 0 || false,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
