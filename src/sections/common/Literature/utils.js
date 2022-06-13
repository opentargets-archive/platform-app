import { GraphQLEnumType } from 'graphql';

export const GREATER_THAN = 'GreaterThan';
export const LESSER_THAN = 'LesserThan';

export const ComparatorEnum = new GraphQLEnumType({
  name: 'ComparatorEnum',
  values: {
    GreaterThan: {
      value: GREATER_THAN,
    },
    LesserThan: {
      value: LESSER_THAN,
    },
  },
});
