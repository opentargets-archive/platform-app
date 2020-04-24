import { loader } from 'graphql.macro';

export const id = 'mechanismsOfAction';
export const name = 'Mechanisms of Action';
export const shortName = 'MA';

export const hasSummaryData = data => {
  return (
    data &&
    data.uniqueActionTypes.length > 0 &&
    data.uniqueTargetTypes.length > 0
  );
};

export const summaryQuery = loader('./summaryQuery.gql');
export const sectionQuery = loader('./sectionQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
