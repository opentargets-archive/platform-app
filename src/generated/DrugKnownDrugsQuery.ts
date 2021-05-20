/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DrugKnownDrugsQuery
// ====================================================

export interface DrugKnownDrugsQuery_drug_knownDrugs_rows_urls {
  __typename: "URL";
  /**
   * resource name
   */
  name: string;
  /**
   * resource url
   */
  url: string;
}

export interface DrugKnownDrugsQuery_drug_knownDrugs_rows_disease {
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

export interface DrugKnownDrugsQuery_drug_knownDrugs_rows_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Approved gene name
   */
  approvedName: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface DrugKnownDrugsQuery_drug_knownDrugs_rows {
  __typename: "KnownDrug";
  /**
   * Clinical Trial phase
   */
  phase: number;
  /**
   * Trial status
   */
  status: string | null;
  /**
   * Source urls from clinical trials
   */
  urls: DrugKnownDrugsQuery_drug_knownDrugs_rows_urls[];
  /**
   * Curated disease indication entity
   */
  disease: DrugKnownDrugsQuery_drug_knownDrugs_rows_disease | null;
  /**
   * Drug target entity based on curated mechanism of action
   */
  target: DrugKnownDrugsQuery_drug_knownDrugs_rows_target | null;
}

export interface DrugKnownDrugsQuery_drug_knownDrugs {
  __typename: "KnownDrugs";
  /**
   * Total number of entries
   */
  count: any;
  cursor: string | null;
  /**
   * Clinical precedence entries with known mechanism of action
   */
  rows: DrugKnownDrugsQuery_drug_knownDrugs_rows[];
}

export interface DrugKnownDrugsQuery_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Curated Clinical trial records and and post-marketing package inserts with a known mechanism of action
   */
  knownDrugs: DrugKnownDrugsQuery_drug_knownDrugs | null;
}

export interface DrugKnownDrugsQuery {
  /**
   * Return a drug
   */
  drug: DrugKnownDrugsQuery_drug | null;
}

export interface DrugKnownDrugsQueryVariables {
  chemblId: string;
  cursor?: string | null;
  freeTextQuery?: string | null;
  size?: number | null;
}
