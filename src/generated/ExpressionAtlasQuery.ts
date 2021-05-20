/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExpressionAtlasQuery
// ====================================================

export interface ExpressionAtlasQuery_disease_evidences_rows_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Disease name
   */
  name: string;
}

export interface ExpressionAtlasQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: ExpressionAtlasQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  contrast: string | null;
  confidence: string | null;
  studyOverview: string | null;
  log2FoldChangeValue: number | null;
  resourceScore: number | null;
  log2FoldChangePercentileRank: any | null;
  studyId: string | null;
}

export interface ExpressionAtlasQuery_disease_evidences {
  __typename: "Evidences";
  rows: ExpressionAtlasQuery_disease_evidences_rows[];
}

export interface ExpressionAtlasQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: ExpressionAtlasQuery_disease_evidences;
}

export interface ExpressionAtlasQuery {
  /**
   * Return a Disease
   */
  disease: ExpressionAtlasQuery_disease | null;
}

export interface ExpressionAtlasQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
