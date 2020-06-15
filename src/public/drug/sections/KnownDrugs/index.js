import { loader } from 'graphql.macro';

export const id = 'knownDrugs';
export const name = 'Clinical Precedence';

export const hasSummaryData = data => data && data.count > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
