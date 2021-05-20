/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InteractionsStringQuery
// ====================================================

export interface InteractionsStringQuery_target_interactions_rows_targetB {
  __typename: "Target";
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
  /**
   * Open Targets target id
   */
  id: string;
}

export interface InteractionsStringQuery_target_interactions_rows_evidences {
  __typename: "InteractionEvidence";
  evidenceScore: number | null;
  interactionDetectionMethodShortName: string;
}

export interface InteractionsStringQuery_target_interactions_rows {
  __typename: "Interaction";
  intA: string;
  intB: string;
  targetB: InteractionsStringQuery_target_interactions_rows_targetB | null;
  score: number | null;
  /**
   * List of evidences for this interaction
   */
  evidences: InteractionsStringQuery_target_interactions_rows_evidences[];
}

export interface InteractionsStringQuery_target_interactions {
  __typename: "Interactions";
  rows: InteractionsStringQuery_target_interactions_rows[];
}

export interface InteractionsStringQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Biological pathway membership from Reactome
   */
  interactions: InteractionsStringQuery_target_interactions | null;
}

export interface InteractionsStringQuery {
  /**
   * Return a Target
   */
  target: InteractionsStringQuery_target | null;
}

export interface InteractionsStringQueryVariables {
  ensgId: string;
  sourceDatabase?: string | null;
  index?: number | null;
  size?: number | null;
}
