import { loader } from 'graphql.macro';

export const id = 'genetic';
export const name = 'Genetic Associations';

const datasources = [
  'gwasCatalog',
  'uniProt',
  'uniProtLiterature',
  'eva',
  'genomicsEngland',
  'gene2Phenotype',
];

export const getSummaryFromSummaries = summariesData =>
  datasources.reduce((acc, d) => {
    acc[d] = summariesData[d];
    return acc;
  }, {});

export const hasSummaryData = ({ gwasCatalog: { variantCount } }) =>
  variantCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
// export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
