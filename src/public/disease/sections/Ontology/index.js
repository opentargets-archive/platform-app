import { loader } from 'graphql.macro';

export const id = 'ontology';
export const name = 'Ontology';

export const hasSummaryData = () => true; // all terms are in the ontology

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
