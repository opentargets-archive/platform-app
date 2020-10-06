import { loader } from 'graphql.macro';

export const id = 'interactions';
export const name = 'Molecular Interactions';
export const shortName = 'MI';

export const hasSummaryData = data => true;

export const summaryQuery = loader('./summaryQuery.gql');
// export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
