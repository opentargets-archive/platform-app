import { loader } from 'graphql.macro';

export const id = 'phenotypes';
export const name = 'Phenotypes';
export const shortName = 'PH';

export const hasSummaryData = ({ phenotypesCount }) => phenotypesCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
