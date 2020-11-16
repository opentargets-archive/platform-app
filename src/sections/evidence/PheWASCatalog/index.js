export const definition = {
  id: 'phewasCatalog',
  name: 'PheWAS Catalog',
  shortName: 'PC',
  hasData: data => data.phewasCatalogSummary.count > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
