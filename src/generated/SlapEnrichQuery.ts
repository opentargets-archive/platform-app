/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SlapEnrichQuery
// ====================================================

export interface SlapEnrichQuery_disease_evidences_rows_disease {
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

export interface SlapEnrichQuery_disease_evidences_rows_pathways {
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

export interface SlapEnrichQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: SlapEnrichQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  pathways: SlapEnrichQuery_disease_evidences_rows_pathways[] | null;
  resourceScore: number | null;
}

export interface SlapEnrichQuery_disease_evidences {
  __typename: "Evidences";
  rows: SlapEnrichQuery_disease_evidences_rows[];
}

export interface SlapEnrichQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: SlapEnrichQuery_disease_evidences;
}

export interface SlapEnrichQuery {
  /**
   * Return a Disease
   */
  disease: SlapEnrichQuery_disease | null;
}

export interface SlapEnrichQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
