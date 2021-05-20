/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChemblQuery
// ====================================================

export interface ChemblQuery_disease_evidences_rows_disease {
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

export interface ChemblQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
}

export interface ChemblQuery_disease_evidences_rows_drug_mechanismsOfAction_rows_targets {
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

export interface ChemblQuery_disease_evidences_rows_drug_mechanismsOfAction_rows {
  __typename: "MechanismOfActionRow";
  mechanismOfAction: string;
  /**
   * Target List
   */
  targets: ChemblQuery_disease_evidences_rows_drug_mechanismsOfAction_rows_targets[];
}

export interface ChemblQuery_disease_evidences_rows_drug_mechanismsOfAction {
  __typename: "MechanismsOfAction";
  rows: ChemblQuery_disease_evidences_rows_drug_mechanismsOfAction_rows[];
}

export interface ChemblQuery_disease_evidences_rows_drug {
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
   * Drug modality
   */
  drugType: string;
  /**
   * Mechanisms of action to produce intended pharmacological effects. Curated from scientific literature and post-marketing package inserts
   */
  mechanismsOfAction: ChemblQuery_disease_evidences_rows_drug_mechanismsOfAction | null;
}

export interface ChemblQuery_disease_evidences_rows_urls {
  __typename: "LabelledUri";
  niceName: string;
  url: string;
}

export interface ChemblQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: ChemblQuery_disease_evidences_rows_disease;
  /**
   * Target evidence
   */
  target: ChemblQuery_disease_evidences_rows_target;
  targetFromSourceId: string | null;
  drug: ChemblQuery_disease_evidences_rows_drug | null;
  clinicalPhase: any | null;
  clinicalStatus: string | null;
  studyStartDate: string | null;
  studyStopReason: string | null;
  urls: ChemblQuery_disease_evidences_rows_urls[] | null;
}

export interface ChemblQuery_disease_evidences {
  __typename: "Evidences";
  count: any;
  rows: ChemblQuery_disease_evidences_rows[];
}

export interface ChemblQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: ChemblQuery_disease_evidences;
}

export interface ChemblQuery {
  /**
   * Return a Disease
   */
  disease: ChemblQuery_disease | null;
}

export interface ChemblQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
