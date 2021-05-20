/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExpressionQuery
// ====================================================

export interface ExpressionQuery_target_expressions_tissue {
  __typename: "Tissue";
  /**
   * UBERON tissue label
   */
  label: string;
  /**
   * Organs membership
   */
  organs: string[];
  /**
   * Anatomical systems membership
   */
  anatomicalSystems: string[];
}

export interface ExpressionQuery_target_expressions_rna {
  __typename: "RNAExpression";
  value: number;
  level: number;
}

export interface ExpressionQuery_target_expressions_protein {
  __typename: "ProteinExpression";
  level: number;
}

export interface ExpressionQuery_target_expressions {
  __typename: "Expression";
  tissue: ExpressionQuery_target_expressions_tissue;
  rna: ExpressionQuery_target_expressions_rna;
  protein: ExpressionQuery_target_expressions_protein;
}

export interface ExpressionQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * RNA and Protein baseline expression
   */
  expressions: ExpressionQuery_target_expressions[];
}

export interface ExpressionQuery {
  /**
   * Return a Target
   */
  target: ExpressionQuery_target | null;
}

export interface ExpressionQueryVariables {
  ensemblId: string;
}
