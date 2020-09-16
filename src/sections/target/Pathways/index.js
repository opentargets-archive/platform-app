import { loader, gql } from 'graphql.macro';

export const id = 'pathways';
export const name = 'Pathways';
export const shortName = 'PW';

export const hasSummaryData = rows => rows.length > 0;

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = gql`
  query PathwaysSectionQuery($ensgId: String!) {
    target(ensemblId: $ensgId) {
      id
      ...targetPathwaysFragment
    }
  }

  ${summaryQuery}
`;

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
