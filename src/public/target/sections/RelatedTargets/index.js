import { loader } from 'graphql.macro';

export const id = 'relatedTargets';
export const name = 'Related Targets';

export const hasSummaryData = relatedTargets =>
  relatedTargets && relatedTargets.count > 0;

export const summaryQuery = loader('./summaryQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
