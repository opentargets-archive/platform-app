/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenomicsEnglandQuery
// ====================================================

export interface GenomicsEnglandQuery_disease_evidences_rows_disease {
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

export interface GenomicsEnglandQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface GenomicsEnglandQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: GenomicsEnglandQuery_disease_evidences_rows_disease;
  /**
   * Target evidence
   */
  target: GenomicsEnglandQuery_disease_evidences_rows_target;
  diseaseFromSource: string | null;
  cohortPhenotypes: string[] | null;
  confidence: string | null;
  allelicRequirements: string[] | null;
  studyOverview: string | null;
  studyId: string | null;
  literature: string[] | null;
}

export interface GenomicsEnglandQuery_disease_evidences {
  __typename: "Evidences";
  rows: GenomicsEnglandQuery_disease_evidences_rows[];
}

export interface GenomicsEnglandQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: GenomicsEnglandQuery_disease_evidences;
}

export interface GenomicsEnglandQuery {
  /**
   * Return a Disease
   */
  disease: GenomicsEnglandQuery_disease | null;
}

export interface GenomicsEnglandQueryVariables {
  ensemblId: string;
  efoId: string;
}
