/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PathwaysSummaryFragment
// ====================================================

export interface PathwaysSummaryFragment_proteinAnnotations {
  __typename: "ProteinAnnotations";
  /**
   * Uniprot reference accession
   */
  id: string;
}

export interface PathwaysSummaryFragment_reactome_ancestors {
  __typename: "Reactome";
  /**
   * If the node is root
   */
  isRoot: boolean;
  id: string;
  label: string;
}

export interface PathwaysSummaryFragment_reactome {
  __typename: "Reactome";
  id: string;
  label: string;
  /**
   * Reactome Nodes
   */
  ancestors: PathwaysSummaryFragment_reactome_ancestors[];
}

export interface PathwaysSummaryFragment {
  __typename: "Target";
  /**
   * Various protein coding annotation
   */
  proteinAnnotations: PathwaysSummaryFragment_proteinAnnotations | null;
  reactome: PathwaysSummaryFragment_reactome[];
}
