/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ExpressionSummaryFragment
// ====================================================

export interface ExpressionSummaryFragment_expressions_rna {
  __typename: "RNAExpression";
  level: number;
}

export interface ExpressionSummaryFragment_expressions_protein {
  __typename: "ProteinExpression";
  level: number;
}

export interface ExpressionSummaryFragment_expressions {
  __typename: "Expression";
  rna: ExpressionSummaryFragment_expressions_rna;
  protein: ExpressionSummaryFragment_expressions_protein;
}

export interface ExpressionSummaryFragment {
  __typename: "Target";
  /**
   * RNA and Protein baseline expression
   */
  expressions: ExpressionSummaryFragment_expressions[];
}
