import { loader } from 'graphql.macro';

export const id = 'variation';
export const name = 'Variation and Genomic Context';
export const shortName = 'V';

export const hasSummaryData = ({ common, rare }) =>
  common.variantsCount > 0 || rare.mutationsCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
