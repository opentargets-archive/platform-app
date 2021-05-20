/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CancerBiomarkersQuery
// ====================================================

export interface CancerBiomarkersQuery_target_cancerBiomarkers_rows_sources {
  __typename: "CancerBiomarkerSource";
  /**
   * Source link
   */
  link: string | null;
  /**
   * Source name
   */
  name: string | null;
}

export interface CancerBiomarkersQuery_target_cancerBiomarkers_rows_target {
  __typename: "Target";
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface CancerBiomarkersQuery_target_cancerBiomarkers_rows_disease {
  __typename: "Disease";
  /**
   * Disease name
   */
  name: string;
  /**
   * Open Targets disease id
   */
  id: string;
}

export interface CancerBiomarkersQuery_target_cancerBiomarkers_rows {
  __typename: "CancerBiomarker";
  /**
   * Target symbol and variant id
   */
  biomarker: string;
  /**
   * Drug responsiveness
   */
  associationType: string;
  /**
   * Drug family or name
   */
  drugName: string;
  /**
   * Source type
   */
  evidenceLevel: string;
  /**
   * Sources
   */
  sources: CancerBiomarkersQuery_target_cancerBiomarkers_rows_sources[];
  /**
   * List of supporting publications
   */
  pubmedIds: any[];
  /**
   * Target entity
   */
  target: CancerBiomarkersQuery_target_cancerBiomarkers_rows_target;
  /**
   * Disease entity
   */
  disease: CancerBiomarkersQuery_target_cancerBiomarkers_rows_disease | null;
}

export interface CancerBiomarkersQuery_target_cancerBiomarkers {
  __typename: "CancerBiomarkers";
  /**
   * Number of unique drugs with response information
   */
  uniqueDrugs: any;
  /**
   * Number of unique cancer diseases with drug response information
   */
  uniqueDiseases: any;
  /**
   * Number of unique biomarkers with drug response information
   */
  uniqueBiomarkers: any;
  /**
   * Number of entries
   */
  count: any;
  /**
   * Cancer Biomarker entries
   */
  rows: CancerBiomarkersQuery_target_cancerBiomarkers_rows[];
}

export interface CancerBiomarkersQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Clinical relevance and drug responses of tumor genomic alterations on the target
   */
  cancerBiomarkers: CancerBiomarkersQuery_target_cancerBiomarkers | null;
}

export interface CancerBiomarkersQuery {
  /**
   * Return a Target
   */
  target: CancerBiomarkersQuery_target | null;
}

export interface CancerBiomarkersQueryVariables {
  ensgId: string;
  index: number;
  size: number;
}
