/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: reactomeQuery
// ====================================================

export interface reactomeQuery_disease_evidences_rows_disease {
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

export interface reactomeQuery_disease_evidences_rows_pathways {
  __typename: "Pathway";
  /**
   * Pathway ID
   */
  id: string;
  /**
   * Pathway Name
   */
  name: string;
}

export interface reactomeQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: reactomeQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  reactionName: string | null;
  reactionId: string | null;
  targetFromSourceId: string | null;
  pathways: reactomeQuery_disease_evidences_rows_pathways[] | null;
  targetModulation: string | null;
  variantAminoacidDescriptions: string[] | null;
  literature: string[] | null;
}

export interface reactomeQuery_disease_evidences {
  __typename: "Evidences";
  rows: reactomeQuery_disease_evidences_rows[];
}

export interface reactomeQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: reactomeQuery_disease_evidences;
}

export interface reactomeQuery {
  /**
   * Return a Disease
   */
  disease: reactomeQuery_disease | null;
}

export interface reactomeQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
