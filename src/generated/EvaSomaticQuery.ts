/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EvaSomaticQuery
// ====================================================

export interface EvaSomaticQuery_disease_evidences_rows_disease {
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

export interface EvaSomaticQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: EvaSomaticQuery_disease_evidences_rows_disease;
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
  clinicalSignificances: string[] | null;
  allelicRequirements: string[] | null;
  alleleOrigins: string[] | null;
  confidence: string | null;
  literature: string[] | null;
  cohortPhenotypes: string[] | null;
}

export interface EvaSomaticQuery_disease_evidences {
  __typename: "Evidences";
  rows: EvaSomaticQuery_disease_evidences_rows[];
}

export interface EvaSomaticQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: EvaSomaticQuery_disease_evidences;
}

export interface EvaSomaticQuery_target_hallmarks_attributes_reference {
  __typename: "LiteratureReference";
  pubmedId: any | null;
  description: string;
}

export interface EvaSomaticQuery_target_hallmarks_attributes {
  __typename: "HallmarkAttribute";
  reference: EvaSomaticQuery_target_hallmarks_attributes_reference;
  name: string;
}

export interface EvaSomaticQuery_target_hallmarks {
  __typename: "Hallmarks";
  attributes: EvaSomaticQuery_target_hallmarks_attributes[];
}

export interface EvaSomaticQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Target-modulated essential alterations in cell physiology that dictate malignant growth
   */
  hallmarks: EvaSomaticQuery_target_hallmarks | null;
}

export interface EvaSomaticQuery {
  /**
   * Return a Disease
   */
  disease: EvaSomaticQuery_disease | null;
  /**
   * Return a Target
   */
  target: EvaSomaticQuery_target | null;
}

export interface EvaSomaticQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
