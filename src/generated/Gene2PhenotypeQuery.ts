/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Gene2PhenotypeQuery
// ====================================================

export interface Gene2PhenotypeQuery_disease_evidences_rows_disease {
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

export interface Gene2PhenotypeQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface Gene2PhenotypeQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Evidence identifier
   */
  id: string;
  /**
   * Disease evidence
   */
  disease: Gene2PhenotypeQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  allelicRequirements: string[] | null;
  confidence: string | null;
  studyId: string | null;
  /**
   * Target evidence
   */
  target: Gene2PhenotypeQuery_disease_evidences_rows_target;
}

export interface Gene2PhenotypeQuery_disease_evidences {
  __typename: "Evidences";
  rows: Gene2PhenotypeQuery_disease_evidences_rows[];
}

export interface Gene2PhenotypeQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: Gene2PhenotypeQuery_disease_evidences;
}

export interface Gene2PhenotypeQuery {
  /**
   * Return a Disease
   */
  disease: Gene2PhenotypeQuery_disease | null;
}

export interface Gene2PhenotypeQueryVariables {
  ensemblId: string;
  efoId: string;
}
