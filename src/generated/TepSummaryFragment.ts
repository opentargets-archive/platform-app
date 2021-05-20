/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TepSummaryFragment
// ====================================================

export interface TepSummaryFragment_tep {
  __typename: "Tep";
  uri: string;
  name: string;
}

export interface TepSummaryFragment {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Target Enabling Package (TEP)
   */
  tep: TepSummaryFragment_tep | null;
}
