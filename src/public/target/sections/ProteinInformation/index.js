import { loader } from 'graphql.macro';

export const id = 'protein';
export const name = 'Protein Information';

export const hasSummaryData = data =>
  data.hasSequenceAnnotationVisualisation ||
  data.hasProteinStructure ||
  data.hasSubCellularLocation ||
  data.hasSubUnitData ||
  data.hasUniprotKeywords;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
