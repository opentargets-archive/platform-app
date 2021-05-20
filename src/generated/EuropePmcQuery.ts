/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EuropePmcQuery
// ====================================================

export interface EuropePmcQuery_disease_evidences_rows_disease {
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

export interface EuropePmcQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
  /**
   * Open Targets target id
   */
  id: string;
}

export interface EuropePmcQuery_disease_evidences_rows_textMiningSentences {
  __typename: "EvidenceTextMiningSentence";
  tStart: any;
  tEnd: any;
  dStart: any;
  dEnd: any;
  section: string;
  text: string;
}

export interface EuropePmcQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: EuropePmcQuery_disease_evidences_rows_disease;
  /**
   * Target evidence
   */
  target: EuropePmcQuery_disease_evidences_rows_target;
  literature: string[] | null;
  textMiningSentences: EuropePmcQuery_disease_evidences_rows_textMiningSentences[] | null;
  resourceScore: number | null;
}

export interface EuropePmcQuery_disease_evidences {
  __typename: "Evidences";
  count: any;
  cursor: string | null;
  rows: EuropePmcQuery_disease_evidences_rows[];
}

export interface EuropePmcQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: EuropePmcQuery_disease_evidences;
}

export interface EuropePmcQuery {
  /**
   * Return a Disease
   */
  disease: EuropePmcQuery_disease | null;
}

export interface EuropePmcQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
  cursor?: string | null;
}
