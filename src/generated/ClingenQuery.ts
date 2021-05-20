/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClingenQuery
// ====================================================

export interface ClingenQuery_disease_evidences_rows_disease {
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

export interface ClingenQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: ClingenQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  allelicRequirements: string[] | null;
  studyId: string | null;
  confidence: string | null;
}

export interface ClingenQuery_disease_evidences {
  __typename: "Evidences";
  count: any;
  rows: ClingenQuery_disease_evidences_rows[];
}

export interface ClingenQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: ClingenQuery_disease_evidences;
}

export interface ClingenQuery {
  /**
   * Return a Disease
   */
  disease: ClingenQuery_disease | null;
}

export interface ClingenQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
