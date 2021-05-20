/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MousePhenotypesSummaryFragment
// ====================================================

export interface MousePhenotypesSummaryFragment_mousePhenotypes_phenotypes_genotypePhenotype {
  __typename: "GenotypePhenotype";
  subjectBackground: string;
  subjectAllelicComposition: string;
  pubmedId: string;
  label: string;
  identifier: string;
}

export interface MousePhenotypesSummaryFragment_mousePhenotypes_phenotypes {
  __typename: "MousePhenotype";
  categoryLabel: string;
  categoryIdentifier: string;
  genotypePhenotype: MousePhenotypesSummaryFragment_mousePhenotypes_phenotypes_genotypePhenotype[];
}

export interface MousePhenotypesSummaryFragment_mousePhenotypes {
  __typename: "MouseGene";
  id: string;
  symbol: string;
  phenotypes: MousePhenotypesSummaryFragment_mousePhenotypes_phenotypes[];
}

export interface MousePhenotypesSummaryFragment {
  __typename: "Target";
  /**
   * Biological pathway membership from Reactome
   */
  mousePhenotypes: MousePhenotypesSummaryFragment_mousePhenotypes[];
}
