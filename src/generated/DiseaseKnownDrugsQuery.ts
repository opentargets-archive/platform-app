/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DiseaseKnownDrugsQuery
// ====================================================

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_urls {
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

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_disease {
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

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug_mechanismsOfAction_rows_targets {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
}

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug_mechanismsOfAction_rows {
  __typename: "MechanismOfActionRow";
  actionType: string | null;
  /**
   * Target List
   */
  targets: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug_mechanismsOfAction_rows_targets[];
}

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug_mechanismsOfAction {
  __typename: "MechanismsOfAction";
  rows: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug_mechanismsOfAction_rows[];
}

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Molecule preferred name
   */
  name: string;
  /**
   * Mechanisms of action to produce intended pharmacological effects. Curated from scientific literature and post-marketing package inserts
   */
  mechanismsOfAction: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug_mechanismsOfAction | null;
}

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows_target {
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

export interface DiseaseKnownDrugsQuery_disease_knownDrugs_rows {
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
  urls: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_urls[];
  /**
   * Curated disease indication entity
   */
  disease: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_disease | null;
  /**
   * Curated drug entity
   */
  drug: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_drug | null;
  /**
   * Drug modality
   */
  drugType: string;
  /**
   * Mechanism of Action description
   */
  mechanismOfAction: string;
  /**
   * Drug target entity based on curated mechanism of action
   */
  target: DiseaseKnownDrugsQuery_disease_knownDrugs_rows_target | null;
}

export interface DiseaseKnownDrugsQuery_disease_knownDrugs {
  __typename: "KnownDrugs";
  /**
   * Total number of entries
   */
  count: any;
  cursor: string | null;
  /**
   * Clinical precedence entries with known mechanism of action
   */
  rows: DiseaseKnownDrugsQuery_disease_knownDrugs_rows[];
}

export interface DiseaseKnownDrugsQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Clinical precedence for investigational or approved drugs indicated for disease and curated mechanism of action
   */
  knownDrugs: DiseaseKnownDrugsQuery_disease_knownDrugs | null;
}

export interface DiseaseKnownDrugsQuery {
  /**
   * Return a Disease
   */
  disease: DiseaseKnownDrugsQuery_disease | null;
}

export interface DiseaseKnownDrugsQueryVariables {
  efoId: string;
  cursor?: string | null;
  freeTextQuery?: string | null;
  size?: number | null;
}
