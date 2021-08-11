export const definition = {
  id: 'compGenomics',
  name: 'Comparative Genomics',
  shortName: 'CG',
  hasData: data => {
    return data.homologues.length > 0;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
