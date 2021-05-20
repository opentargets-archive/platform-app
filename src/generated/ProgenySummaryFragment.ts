/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProgenySummaryFragment
// ====================================================

export interface ProgenySummaryFragment_progeny {
  __typename: "Evidences";
  count: any;
}

export interface ProgenySummaryFragment {
  __typename: "Disease";
  /**
   * The complete list of all possible datasources
   */
  progeny: ProgenySummaryFragment_progeny;
}
