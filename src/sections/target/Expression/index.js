import { loader } from 'graphql.macro';

export const id = 'expressions';
export const name = 'Baseline Expression';

export const hasSummaryData = data => {
  const hasRNA = data.some(d => d.rna.level >= 0);
  const hasProtein = data.some(d => d.protein.level >= 0);
  return hasRNA || hasProtein;
};

export const summaryQuery = loader('./summaryQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
