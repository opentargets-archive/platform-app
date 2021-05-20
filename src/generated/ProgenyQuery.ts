/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProgenyQuery
// ====================================================

export interface ProgenyQuery_disease_evidences_rows_disease {
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

export interface ProgenyQuery_disease_evidences_rows_pathways {
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

export interface ProgenyQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: ProgenyQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  pathways: ProgenyQuery_disease_evidences_rows_pathways[] | null;
  resourceScore: number | null;
}

export interface ProgenyQuery_disease_evidences {
  __typename: "Evidences";
  rows: ProgenyQuery_disease_evidences_rows[];
}

export interface ProgenyQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: ProgenyQuery_disease_evidences;
}

export interface ProgenyQuery {
  /**
   * Return a Disease
   */
  disease: ProgenyQuery_disease | null;
}

export interface ProgenyQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
