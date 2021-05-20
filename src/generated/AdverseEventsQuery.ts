/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdverseEventsQuery
// ====================================================

export interface AdverseEventsQuery_drug_maxLlr_rows {
  __typename: "AdverseEvent";
  /**
   * Log-likelihood ratio
   */
  logLR: number;
}

export interface AdverseEventsQuery_drug_maxLlr {
  __typename: "AdverseEvents";
  /**
   * Significant adverse event entries
   */
  rows: AdverseEventsQuery_drug_maxLlr_rows[];
}

export interface AdverseEventsQuery_drug_adverseEvents_rows {
  __typename: "AdverseEvent";
  /**
   * Meddra term on adverse event
   */
  name: string;
  /**
   * Number of reports mentioning drug and adverse event
   */
  count: any;
  /**
   * Log-likelihood ratio
   */
  logLR: number;
  /**
   * 8 digit unique meddra identification number
   */
  meddraCode: string | null;
}

export interface AdverseEventsQuery_drug_adverseEvents {
  __typename: "AdverseEvents";
  /**
   * LLR critical value to define significance
   */
  criticalValue: number;
  /**
   * Total significant adverse events
   */
  count: any;
  /**
   * Significant adverse event entries
   */
  rows: AdverseEventsQuery_drug_adverseEvents_rows[];
}

export interface AdverseEventsQuery_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Significant adverse events inferred from FAERS reports
   */
  maxLlr: AdverseEventsQuery_drug_maxLlr | null;
  /**
   * Significant adverse events inferred from FAERS reports
   */
  adverseEvents: AdverseEventsQuery_drug_adverseEvents | null;
}

export interface AdverseEventsQuery {
  /**
   * Return a drug
   */
  drug: AdverseEventsQuery_drug | null;
}

export interface AdverseEventsQueryVariables {
  chemblId: string;
  index?: number | null;
  size?: number | null;
}
