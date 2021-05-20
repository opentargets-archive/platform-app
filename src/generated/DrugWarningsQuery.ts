/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DrugWarningsQuery
// ====================================================

export interface DrugWarningsQuery_drug_drugWarnings_references {
  __typename: "DrugWarningReference";
  id: string;
  source: string;
  url: string;
}

export interface DrugWarningsQuery_drug_drugWarnings {
  __typename: "DrugWarning";
  /**
   * Either 'black box warning' or 'withdrawn'
   */
  warningType: string;
  /**
   * Reason for withdrawal
   */
  description: string | null;
  /**
   * High level toxicity category by Meddra System Organ Class
   */
  toxicityClass: string | null;
  meddraSocCode: number | null;
  /**
   * Country issuing warning
   */
  country: string | null;
  /**
   * Year of withdrawal
   */
  year: number | null;
  /**
   * Source of withdrawal information
   */
  references: DrugWarningsQuery_drug_drugWarnings_references[] | null;
}

export interface DrugWarningsQuery_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Drug warnings
   */
  drugWarnings: DrugWarningsQuery_drug_drugWarnings[];
}

export interface DrugWarningsQuery {
  /**
   * Return a drug
   */
  drug: DrugWarningsQuery_drug | null;
}

export interface DrugWarningsQueryVariables {
  chemblId: string;
}
