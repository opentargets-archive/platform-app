import { loader } from 'graphql.macro';
import _ from 'lodash';

export const id = 'proteinAnnotations';
export const name = 'Protein Information';

export const hasSummaryData = data =>
  _.get(data, 'subcellularLocations.length', 0) > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
