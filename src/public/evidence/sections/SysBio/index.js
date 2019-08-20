import { loader } from 'graphql.macro';

export const id = 'sysBio';
export const name = 'Systems Biology';

export const hasSummaryData = ({ hasSysBio }) => hasSysBio;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
