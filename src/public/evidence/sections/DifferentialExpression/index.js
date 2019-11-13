import { loader } from 'graphql.macro';

export const id = 'differentialExpression';
export const name = 'Expression Atlas';

export const hasSummaryData = ({ experimentCount }) => experimentCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
