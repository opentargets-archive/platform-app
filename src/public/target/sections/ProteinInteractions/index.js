import { loader } from 'graphql.macro';

export const id = 'proteinInteractions';
export const name = 'Protein Interactions';

export const hasSummaryData = data =>
  data.ppi > 0 || data.pathways > 0 || data.enzymeSubstrate > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
