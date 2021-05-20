/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CrisprQuery
// ====================================================

export interface CrisprQuery_disease_evidences_rows_disease {
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

export interface CrisprQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: CrisprQuery_disease_evidences_rows_disease;
  diseaseCellLines: string[] | null;
  diseaseFromSource: string | null;
  resourceScore: number | null;
  literature: string[] | null;
}

export interface CrisprQuery_disease_evidences {
  __typename: "Evidences";
  rows: CrisprQuery_disease_evidences_rows[];
}

export interface CrisprQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: CrisprQuery_disease_evidences;
}

export interface CrisprQuery {
  /**
   * Return a Disease
   */
  disease: CrisprQuery_disease | null;
}

export interface CrisprQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
