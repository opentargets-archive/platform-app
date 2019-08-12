import { loader } from 'graphql.macro';

export const id = 'linkedTargets';
export const name = 'Targets';

export const hasSummaryData = ({ linkedTargetCount }) => linkedTargetCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
