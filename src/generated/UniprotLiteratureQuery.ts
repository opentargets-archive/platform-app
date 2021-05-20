/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UniprotLiteratureQuery
// ====================================================

export interface UniprotLiteratureQuery_disease_evidences_rows_disease {
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

export interface UniprotLiteratureQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: UniprotLiteratureQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  targetFromSourceId: string | null;
  studyId: string | null;
  literature: string[] | null;
  confidence: string | null;
}

export interface UniprotLiteratureQuery_disease_evidences {
  __typename: "Evidences";
  rows: UniprotLiteratureQuery_disease_evidences_rows[];
}

export interface UniprotLiteratureQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: UniprotLiteratureQuery_disease_evidences;
}

export interface UniprotLiteratureQuery {
  /**
   * Return a Disease
   */
  disease: UniprotLiteratureQuery_disease | null;
}

export interface UniprotLiteratureQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
