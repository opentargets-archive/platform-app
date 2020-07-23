import { loader } from 'graphql.macro';

export const id = 'genomicsEngland';
export const name = 'Genomics England';

export const hasSummaryData = ({ hasPanel }) => hasPanel;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
