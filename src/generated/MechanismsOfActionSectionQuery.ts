/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MechanismsOfActionSectionQuery
// ====================================================

export interface MechanismsOfActionSectionQuery_drug_mechanismsOfAction_rows_targets {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface MechanismsOfActionSectionQuery_drug_mechanismsOfAction_rows_references {
  __typename: "Reference";
  source: string;
  urls: string[] | null;
}

export interface MechanismsOfActionSectionQuery_drug_mechanismsOfAction_rows {
  __typename: "MechanismOfActionRow";
  mechanismOfAction: string;
  targetName: string | null;
  /**
   * Target List
   */
  targets: MechanismsOfActionSectionQuery_drug_mechanismsOfAction_rows_targets[];
  references: MechanismsOfActionSectionQuery_drug_mechanismsOfAction_rows_references[] | null;
}

export interface MechanismsOfActionSectionQuery_drug_mechanismsOfAction {
  __typename: "MechanismsOfAction";
  rows: MechanismsOfActionSectionQuery_drug_mechanismsOfAction_rows[];
}

export interface MechanismsOfActionSectionQuery_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Mechanisms of action to produce intended pharmacological effects. Curated from scientific literature and post-marketing package inserts
   */
  mechanismsOfAction: MechanismsOfActionSectionQuery_drug_mechanismsOfAction | null;
}

export interface MechanismsOfActionSectionQuery {
  /**
   * Return a drug
   */
  drug: MechanismsOfActionSectionQuery_drug | null;
}

export interface MechanismsOfActionSectionQueryVariables {
  chemblId: string;
}
