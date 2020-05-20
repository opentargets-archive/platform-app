import { loader } from 'graphql.macro';

export const id = 'variation';
export const name = 'Variation and Genomic Context';
export const shortName = 'V';

export const hasSummaryData = () => true;

// Disable summary query for now:
// this widget will be enabled for every target.
// If needed we could use genomicLocation to get a summary in the future
// export const summaryQuery = loader('./summaryQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
