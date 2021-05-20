/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TargetKnownDrugsQuery
// ====================================================

export interface TargetKnownDrugsQuery_target_knownDrugs_rows_urls {
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

export interface TargetKnownDrugsQuery_target_knownDrugs_rows_disease {
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

export interface TargetKnownDrugsQuery_target_knownDrugs_rows_drug_mechanismsOfAction_rows_targets {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
}

export interface TargetKnownDrugsQuery_target_knownDrugs_rows_drug_mechanismsOfAction_rows {
  __typename: "MechanismOfActionRow";
  actionType: string | null;
  /**
   * Target List
   */
  targets: TargetKnownDrugsQuery_target_knownDrugs_rows_drug_mechanismsOfAction_rows_targets[];
}

export interface TargetKnownDrugsQuery_target_knownDrugs_rows_drug_mechanismsOfAction {
  __typename: "MechanismsOfAction";
  rows: TargetKnownDrugsQuery_target_knownDrugs_rows_drug_mechanismsOfAction_rows[];
}

export interface TargetKnownDrugsQuery_target_knownDrugs_rows_drug {
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
  mechanismsOfAction: TargetKnownDrugsQuery_target_knownDrugs_rows_drug_mechanismsOfAction | null;
}

export interface TargetKnownDrugsQuery_target_knownDrugs_rows {
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
  urls: TargetKnownDrugsQuery_target_knownDrugs_rows_urls[];
  /**
   * Curated disease indication entity
   */
  disease: TargetKnownDrugsQuery_target_knownDrugs_rows_disease | null;
  /**
   * Curated drug entity
   */
  drug: TargetKnownDrugsQuery_target_knownDrugs_rows_drug | null;
  /**
   * Drug modality
   */
  drugType: string;
  /**
   * Mechanism of Action description
   */
  mechanismOfAction: string;
}

export interface TargetKnownDrugsQuery_target_knownDrugs {
  __typename: "KnownDrugs";
  /**
   * Total number of entries
   */
  count: any;
  cursor: string | null;
  /**
   * Clinical precedence entries with known mechanism of action
   */
  rows: TargetKnownDrugsQuery_target_knownDrugs_rows[];
}

export interface TargetKnownDrugsQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Clinical precedence for drugs with investigational or approved indications targeting gene products according to their curated mechanism of action
   */
  knownDrugs: TargetKnownDrugsQuery_target_knownDrugs | null;
}

export interface TargetKnownDrugsQuery {
  /**
   * Return a Target
   */
  target: TargetKnownDrugsQuery_target | null;
}

export interface TargetKnownDrugsQueryVariables {
  ensgId: string;
  cursor?: string | null;
  freeTextQuery?: string | null;
  size?: number | null;
}
