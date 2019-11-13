import { loader } from 'graphql.macro';

export const id = 'drugs';
export const name = 'ChEMBL';

export const hasSummaryData = ({ drugCount }) => drugCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
