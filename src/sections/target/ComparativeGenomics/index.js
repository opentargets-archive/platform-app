import countHomologues from './countHomologues';

export const definition = {
  id: 'compGenomics',
  name: 'Comparative Genomics',
  shortName: 'CG',
  hasData: data => {
    const { paralogueCount, orthologueCount } = countHomologues(
      data.homologues
    );
    return paralogueCount > 0 || orthologueCount > 0;
  },
};

export { default as Summary } from './Summary';
export { default as Body } from './Body';
