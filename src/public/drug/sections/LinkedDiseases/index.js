import { loader } from 'graphql.macro';

export const id = 'linkedDiseases';
export const name = 'Diseases';

export const hasSummaryData = ({ linkedDiseaseCount }) =>
  linkedDiseaseCount > 0;

// export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
