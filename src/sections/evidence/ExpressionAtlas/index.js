export const definition = {
  id: 'expression',
  name: 'Expression Atlas',
  shortName: 'EA',
  hasData: ({ expressionAtlasSummary }) => expressionAtlasSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
