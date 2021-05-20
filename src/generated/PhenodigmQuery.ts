/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PhenodigmQuery
// ====================================================

export interface PhenodigmQuery_disease_evidences_rows_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Disease name
   */
  name: string;
}

export interface PhenodigmQuery_disease_evidences_rows_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * HGNC approved symbol
   */
  approvedSymbol: string;
}

export interface PhenodigmQuery_disease_evidences_rows_diseaseModelAssociatedModelPhenotypes {
  __typename: "LabelledElement";
  id: string;
  label: string;
}

export interface PhenodigmQuery_disease_evidences_rows_diseaseModelAssociatedHumanPhenotypes {
  __typename: "LabelledElement";
  id: string;
  label: string;
}

export interface PhenodigmQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: PhenodigmQuery_disease_evidences_rows_disease;
  /**
   * Target evidence
   */
  target: PhenodigmQuery_disease_evidences_rows_target;
  diseaseFromSource: string | null;
  biologicalModelGeneticBackground: string | null;
  biologicalModelAllelicComposition: string | null;
  biologicalModelId: string | null;
  diseaseModelAssociatedModelPhenotypes: PhenodigmQuery_disease_evidences_rows_diseaseModelAssociatedModelPhenotypes[] | null;
  diseaseModelAssociatedHumanPhenotypes: PhenodigmQuery_disease_evidences_rows_diseaseModelAssociatedHumanPhenotypes[] | null;
  /**
   * Evidence score
   */
  score: number;
  targetInModel: string | null;
}

export interface PhenodigmQuery_disease_evidences {
  __typename: "Evidences";
  rows: PhenodigmQuery_disease_evidences_rows[];
}

export interface PhenodigmQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: PhenodigmQuery_disease_evidences;
}

export interface PhenodigmQuery {
  /**
   * Return a Disease
   */
  disease: PhenodigmQuery_disease | null;
}

export interface PhenodigmQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
