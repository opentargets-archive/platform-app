// import { loader } from 'graphql.macro';

export const id = 'textMining';
export const name = 'EuropePMC';

export const hasSummaryData = () => true;

// export const summaryQuery = loader('./summaryQuery.gql');
// export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
