/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MechanismsOfActionSummaryFragment
// ====================================================

export interface MechanismsOfActionSummaryFragment_mechanismsOfAction {
  __typename: "MechanismsOfAction";
  uniqueActionTypes: string[];
  uniqueTargetTypes: string[];
}

export interface MechanismsOfActionSummaryFragment_parentMolecule {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Molecule preferred name
   */
  name: string;
}

export interface MechanismsOfActionSummaryFragment_childMolecules {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Molecule preferred name
   */
  name: string;
}

export interface MechanismsOfActionSummaryFragment {
  __typename: "Drug";
  /**
   * Mechanisms of action to produce intended pharmacological effects. Curated from scientific literature and post-marketing package inserts
   */
  mechanismsOfAction: MechanismsOfActionSummaryFragment_mechanismsOfAction | null;
  /**
   * ChEMBL ID of parent molecule
   */
  parentMolecule: MechanismsOfActionSummaryFragment_parentMolecule | null;
  /**
   * Chembl IDs of molecules that descend from current molecule.
   */
  childMolecules: MechanismsOfActionSummaryFragment_childMolecules[];
}
