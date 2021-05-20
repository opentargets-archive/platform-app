/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CancerHallmarksSummaryFragment
// ====================================================

export interface CancerHallmarksSummaryFragment_hallmarks_attributes_reference {
  __typename: "LiteratureReference";
  pubmedId: any | null;
  description: string;
}

export interface CancerHallmarksSummaryFragment_hallmarks_attributes {
  __typename: "HallmarkAttribute";
  name: string;
  reference: CancerHallmarksSummaryFragment_hallmarks_attributes_reference;
}

export interface CancerHallmarksSummaryFragment_hallmarks_rows_reference {
  __typename: "LiteratureReference";
  description: string;
  pubmedId: any | null;
}

export interface CancerHallmarksSummaryFragment_hallmarks_rows {
  __typename: "CancerHallmark";
  label: string;
  suppress: boolean;
  promote: boolean;
  reference: CancerHallmarksSummaryFragment_hallmarks_rows_reference;
}

export interface CancerHallmarksSummaryFragment_hallmarks {
  __typename: "Hallmarks";
  attributes: CancerHallmarksSummaryFragment_hallmarks_attributes[];
  rows: CancerHallmarksSummaryFragment_hallmarks_rows[];
}

export interface CancerHallmarksSummaryFragment {
  __typename: "Target";
  /**
   * Target-modulated essential alterations in cell physiology that dictate malignant growth
   */
  hallmarks: CancerHallmarksSummaryFragment_hallmarks | null;
}
