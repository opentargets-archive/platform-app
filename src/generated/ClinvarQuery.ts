/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClinvarQuery
// ====================================================

export interface ClinvarQuery_disease_evidences_rows_disease {
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

export interface ClinvarQuery_disease_evidences_rows_variantFunctionalConsequence {
  __typename: "SequenceOntologyTerm";
  /**
   * Sequence Ontology ID
   */
  id: string;
  /**
   * Sequence Ontology Label
   */
  label: string;
}

export interface ClinvarQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: ClinvarQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  /**
   * Variant evidence
   */
  variantId: string | null;
  /**
   * Variant dbSNP identifier
   */
  variantRsId: string | null;
  studyId: string | null;
  variantFunctionalConsequence: ClinvarQuery_disease_evidences_rows_variantFunctionalConsequence | null;
  clinicalSignificances: string[] | null;
  allelicRequirements: string[] | null;
  alleleOrigins: string[] | null;
  confidence: string | null;
  literature: string[] | null;
  cohortPhenotypes: string[] | null;
}

export interface ClinvarQuery_disease_evidences {
  __typename: "Evidences";
  cursor: string | null;
  rows: ClinvarQuery_disease_evidences_rows[];
}

export interface ClinvarQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: ClinvarQuery_disease_evidences;
}

export interface ClinvarQuery {
  /**
   * Return a Disease
   */
  disease: ClinvarQuery_disease | null;
}

export interface ClinvarQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
  cursor?: string | null;
}
