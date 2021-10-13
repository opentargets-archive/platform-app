export const definition = {
  id: 'openPedCanGeneExpressionTarget',
  name: 'OpenPedCan Gene Expression',
  shortName: 'OP',
  hasData: ( data ) => {
    return data ? data.length > 0 : false;
  },
   external: true
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
