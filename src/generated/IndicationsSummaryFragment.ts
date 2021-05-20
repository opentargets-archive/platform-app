/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IndicationsSummaryFragment
// ====================================================

export interface IndicationsSummaryFragment_indications {
  __typename: "Indications";
  count: any;
}

export interface IndicationsSummaryFragment {
  __typename: "Drug";
  /**
   * Investigational and approved indications curated from clinical trial records and post-marketing package inserts
   */
  indications: IndicationsSummaryFragment_indications | null;
}
