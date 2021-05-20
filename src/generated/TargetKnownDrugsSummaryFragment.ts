/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TargetKnownDrugsSummaryFragment
// ====================================================

export interface TargetKnownDrugsSummaryFragment_knownDrugs {
  __typename: "KnownDrugs";
  /**
   * Total number of entries
   */
  count: any;
  /**
   * Total unique drugs/molecules
   */
  uniqueDrugs: any;
  /**
   * Total unique diseases or phenotypes
   */
  uniqueDiseases: any;
}

export interface TargetKnownDrugsSummaryFragment {
  __typename: "Target";
  /**
   * Clinical precedence for drugs with investigational or approved indications targeting gene products according to their curated mechanism of action
   */
  knownDrugs: TargetKnownDrugsSummaryFragment_knownDrugs | null;
}
