/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DiseaseKnownDrugsSummaryFragment
// ====================================================

export interface DiseaseKnownDrugsSummaryFragment_knownDrugs {
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
   * Total unique known mechanism of action targetsTotal unique known mechanism of action targets
   */
  uniqueTargets: any;
}

export interface DiseaseKnownDrugsSummaryFragment {
  __typename: "Disease";
  /**
   * Clinical precedence for investigational or approved drugs indicated for disease and curated mechanism of action
   */
  knownDrugs: DiseaseKnownDrugsSummaryFragment_knownDrugs | null;
}
