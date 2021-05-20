/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DrugKnownDrugsSummaryFragment
// ====================================================

export interface DrugKnownDrugsSummaryFragment_knownDrugs {
  __typename: "KnownDrugs";
  /**
   * Total number of entries
   */
  count: any;
  /**
   * Total unique known mechanism of action targetsTotal unique known mechanism of action targets
   */
  uniqueTargets: any;
  /**
   * Total unique diseases or phenotypes
   */
  uniqueDiseases: any;
}

export interface DrugKnownDrugsSummaryFragment {
  __typename: "Drug";
  /**
   * Curated Clinical trial records and and post-marketing package inserts with a known mechanism of action
   */
  knownDrugs: DrugKnownDrugsSummaryFragment_knownDrugs | null;
}
