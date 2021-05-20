/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChemicalProbesSummaryFragment
// ====================================================

export interface ChemicalProbesSummaryFragment_chemicalProbes_rows_sourcelinks {
  __typename: "SourceLink";
  /**
   * Source name
   */
  source: string;
  /**
   * Source full url
   */
  link: string;
}

export interface ChemicalProbesSummaryFragment_chemicalProbes_rows {
  __typename: "PortalProbe";
  /**
   * Chemical probe name
   */
  chemicalprobe: string;
  /**
   * Additional note
   */
  note: string;
  /**
   * Sources
   */
  sourcelinks: ChemicalProbesSummaryFragment_chemicalProbes_rows_sourcelinks[];
}

export interface ChemicalProbesSummaryFragment_chemicalProbes {
  __typename: "ChemicalProbes";
  /**
   * Probeminer chemical probe url
   */
  probeminer: string | null;
  /**
   * Chemical probes entries in SGC or ChemicalProbes.org
   */
  rows: ChemicalProbesSummaryFragment_chemicalProbes_rows[];
}

export interface ChemicalProbesSummaryFragment {
  __typename: "Target";
  /**
   * Potent, selective and cell-permeable chemical probes
   */
  chemicalProbes: ChemicalProbesSummaryFragment_chemicalProbes | null;
}
