import { loader } from 'graphql.macro';

export const id = 'molecularInteractions';
export const name = 'Molecular Interactions';
export const shortName = 'MI';

export const hasSummaryData = data => true;
// data.ppi > 0 || data.pathways > 0 || data.enzymeSubstrate > 0;

// export const summaryQuery = loader('./summaryQuery.gql');
// export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
