/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GeneOntologySummaryFragment
// ====================================================

export interface GeneOntologySummaryFragment_proteinAnnotations {
  __typename: "ProteinAnnotations";
  /**
   * Uniprot reference accession
   */
  id: string;
}

export interface GeneOntologySummaryFragment_geneOntology {
  __typename: "GeneOntology";
  term: string;
  id: string;
}

export interface GeneOntologySummaryFragment {
  __typename: "Target";
  /**
   * Various protein coding annotation
   */
  proteinAnnotations: GeneOntologySummaryFragment_proteinAnnotations | null;
  /**
   * Gene Ontology annotations
   */
  geneOntology: GeneOntologySummaryFragment_geneOntology[];
}
