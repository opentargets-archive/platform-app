import { loader } from 'graphql.macro';

export const id = 'geneOntology';
export const name = 'Gene Ontology';

export const hasSummaryData = data =>
  data.molecularFunctionTermsCount > 0 ||
  data.biologicalProcessTermsCount > 0 ||
  data.cellularComponentTermsCount > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
