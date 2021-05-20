/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AdverseEventsSummaryFragment
// ====================================================

export interface AdverseEventsSummaryFragment_adverseEvents {
  __typename: "AdverseEvents";
  /**
   * Total significant adverse events
   */
  count: any;
}

export interface AdverseEventsSummaryFragment {
  __typename: "Drug";
  /**
   * Significant adverse events inferred from FAERS reports
   */
  adverseEvents: AdverseEventsSummaryFragment_adverseEvents | null;
}
