export const definition = {
  id: 'orthologs',
  name: 'Comparative Genomics',
  shortName: 'CG',
  hasData: data => data.orthologueCount > 0,
  external: true,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
