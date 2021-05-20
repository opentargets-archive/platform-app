/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SysBioQuery
// ====================================================

export interface SysBioQuery_disease_evidences_rows_disease {
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

export interface SysBioQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface SysBioQuery_disease_evidences_rows_pathways {
  __typename: "Pathway";
  /**
   * Pathway Name
   */
  name: string;
}

export interface SysBioQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: SysBioQuery_disease_evidences_rows_disease;
  /**
   * Target evidence
   */
  target: SysBioQuery_disease_evidences_rows_target;
  studyOverview: string | null;
  literature: string[] | null;
  pathways: SysBioQuery_disease_evidences_rows_pathways[] | null;
}

export interface SysBioQuery_disease_evidences {
  __typename: "Evidences";
  rows: SysBioQuery_disease_evidences_rows[];
}

export interface SysBioQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: SysBioQuery_disease_evidences;
}

export interface SysBioQuery {
  /**
   * Return a Disease
   */
  disease: SysBioQuery_disease | null;
}

export interface SysBioQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
