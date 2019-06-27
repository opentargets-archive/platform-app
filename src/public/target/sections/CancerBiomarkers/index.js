import { loader } from 'graphql.macro';

export const id = 'cancerBiomarkers';
export const name = 'Cancer Biomarkers';

export const hasSummaryData = ({ hasCancerBiomarkers }) => hasCancerBiomarkers;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
