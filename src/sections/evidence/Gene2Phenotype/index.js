import { loader } from 'graphql.macro';

export const id = 'gene2Phenotype';
export const name = 'Gene2Phenotype';

export const hasSummaryData = ({ hasPanel }) => hasPanel;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
