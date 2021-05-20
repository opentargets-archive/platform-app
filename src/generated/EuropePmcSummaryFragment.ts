/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EuropePmcSummaryFragment
// ====================================================

export interface EuropePmcSummaryFragment_europePmc {
  __typename: "Evidences";
  count: any;
}

export interface EuropePmcSummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  europePmc: EuropePmcSummaryFragment_europePmc;
}
