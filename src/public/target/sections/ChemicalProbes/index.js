import { loader } from 'graphql.macro';

export const id = 'chemicalProbes';
export const name = 'Chemical Probes';

export const hasSummaryData = (data) => {
  return data && ((data.rows && data.rows.length > 0) || data.probeminer);
};

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
