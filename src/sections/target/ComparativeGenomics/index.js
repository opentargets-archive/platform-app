import countOrthologues from './countOrthologues';

export const definition = {
  id: 'compGenomics',
  name: 'Comparative Genomics',
  shortName: 'CG',
  hasData: data => countOrthologues(data.homologues) > 0,
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
