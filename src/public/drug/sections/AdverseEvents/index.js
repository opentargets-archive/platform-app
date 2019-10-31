import { loader } from 'graphql.macro';

export const id = 'adverseEvents';
export const name = 'Adverse Events';

export const hasSummaryData = () => true; // TODO: override this

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
