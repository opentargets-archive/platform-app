/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhenotypesSummaryFragment
// ====================================================

export interface PhenotypesSummaryFragment_phenotypes {
  __typename: "DiseaseHPOs";
  /**
   * Number of entries
   */
  count: any;
}

export interface PhenotypesSummaryFragment {
  __typename: "Disease";
  /**
   * Phenotype from HPO index
   */
  phenotypes: PhenotypesSummaryFragment_phenotypes | null;
}
