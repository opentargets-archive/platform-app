import { loader } from 'graphql.macro';

export const id = 'homology';
export const name = 'Homology';

export const hasSummaryData = ({ orthologuesBySpecies }) =>
  orthologuesBySpecies.some(d => d.orthologuesCount > 0);

export const summaryQuery = loader('./summaryQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
