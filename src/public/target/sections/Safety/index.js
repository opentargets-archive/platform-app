import { loader } from 'graphql.macro';
import gql from 'graphql-tag';

export const id = 'safety';
export const name = 'Safety';

export const hasSummaryData = data => data;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = gql`
  query TargetSafetySectionQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      ...targetSafetyFragment
    }
  }

  ${summaryQuery}
`;

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
