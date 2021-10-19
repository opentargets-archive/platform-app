export const definition = {
  id: 'openPedCanGeneExpressionTarget',
  name: 'OpenPedCan Gene Expression',
  shortName: 'GX',
  hasData: ( data ) => {
    return data ? data.length > 0 : false;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
