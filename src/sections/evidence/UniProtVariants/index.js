export const definition = {
  id: 'uniprotVariants',
  name: 'UniProt variants',
  shortName: 'UV',
  hasData: data => {
    console.log('data', data);
    return data.uniprotVariantsSummary.count > 0;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
