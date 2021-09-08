export const definition = {
  id: 'kidsFirst',
  name: 'OpenPedCan Pediatric Expression',
  shortName: 'OP',
  hasData: ({ expressionAtlasSummary }) => 5 > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
