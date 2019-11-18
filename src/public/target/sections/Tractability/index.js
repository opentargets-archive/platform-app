import { loader } from 'graphql.macro';

export const id = 'tractability';
export const name = 'Tractability';
export const shortName = 'Tr';

export const hasSummaryData = data =>
  data.hasAntibodyTractabilityAssessment ||
  data.hasSmallMoleculeTractabilityAssessment;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
