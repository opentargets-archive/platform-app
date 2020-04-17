import { loader } from 'graphql.macro';

export const id = 'mousePhenotypes';
export const name = 'Mouse Phenotypes';

export const hasSummaryData = (data) =>
  data.phenotypeCount > 0 || data.categoryCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
