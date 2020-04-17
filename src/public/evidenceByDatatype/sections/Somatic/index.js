import { loader } from 'graphql.macro';

export const id = 'somatic';
export const name = 'Somatic Mutations';

const datasources = [
  'uniProtSomatic',
  'evaSomatic',
  'cancerGeneCensus',
  'intogen',
];

export const getSummaryFromSummaries = (summariesData) =>
  datasources.reduce((acc, d) => {
    acc[d] = summariesData[d];
    return acc;
  }, {});
export const getDetailFromDetails = (detailsData) =>
  datasources.reduce((acc, d) => {
    acc[d] = detailsData[d];
    return acc;
  }, {});

export const hasSummaryData = ({
  uniProtSomatic,
  evaSomatic,
  cancerGeneCensus,
  intogen,
}) =>
  [
    uniProtSomatic && uniProtSomatic.hasVariants,
    evaSomatic && evaSomatic.variantCount > 0,
    cancerGeneCensus && cancerGeneCensus.hasMutations,
    intogen && intogen.hasMutations,
  ].some((d) => d);

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
