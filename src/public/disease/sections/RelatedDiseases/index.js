import { loader } from 'graphql.macro';

export const id = 'relatedDiseases';
export const name = 'Related Diseases';

export const hasSummaryData = ({ count }) => count > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
