import { loader } from 'graphql.macro';

export const id = 'expression';
export const name = 'Baseline Expression';

export const hasSummaryData = ({
  rnaBaselineExpression,
  proteinBaselineExpression,
}) => rnaBaselineExpression || proteinBaselineExpression;

export const summaryQuery = loader('./summaryQuery.gql');

export { default as DescriptionComponent } from './Description';
export { default as SummaryComponent } from './Summary';
export { default as SectionComponent } from './Section';
