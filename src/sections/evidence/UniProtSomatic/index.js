import { loader } from 'graphql.macro';

export const id = 'uniProtSomatic';
export const name = 'UniProt Somatic';

export const hasSummaryData = ({ hasVariants }) => hasVariants;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
