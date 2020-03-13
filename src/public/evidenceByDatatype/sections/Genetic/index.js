import { loader } from 'graphql.macro';

export const id = 'genetic';
export const name = 'Genetic Associations';

const datasources = [
  'otGenetics',
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
export const getDetailFromDetails = detailsData =>
  datasources.reduce((acc, d) => {
    acc[d] = detailsData[d];
    return acc;
  }, {});

export const hasSummaryData = ({
  otGenetics,
  uniProt,
  uniProtLiterature,
  eva,
  genomicsEngland,
  gene2Phenotype,
}) =>
  [
    otGenetics && otGenetics.variantCount > 0,
    uniProt && uniProt.variantCount > 0,
    uniProtLiterature && uniProtLiterature.hasVariants,
    eva && eva.variantCount > 0,
    genomicsEngland && genomicsEngland.hasPanel,
    gene2Phenotype && gene2Phenotype.hasPanel,
  ].some(d => d);

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
