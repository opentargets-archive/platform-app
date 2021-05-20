/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UniprotVariantsQuery
// ====================================================

export interface UniprotVariantsQuery_disease_evidences_rows_disease {
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

export interface UniprotVariantsQuery_disease_evidences_rows {
  __typename: "Evidence";
  /**
   * Disease evidence
   */
  disease: UniprotVariantsQuery_disease_evidences_rows_disease;
  diseaseFromSource: string | null;
  targetFromSourceId: string | null;
  /**
   * Variant dbSNP identifier
   */
  variantRsId: string | null;
  confidence: string | null;
  literature: string[] | null;
}

export interface UniprotVariantsQuery_disease_evidences {
  __typename: "Evidences";
  rows: UniprotVariantsQuery_disease_evidences_rows[];
}

export interface UniprotVariantsQuery_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * The complete list of all possible datasources
   */
  evidences: UniprotVariantsQuery_disease_evidences;
}

export interface UniprotVariantsQuery {
  /**
   * Return a Disease
   */
  disease: UniprotVariantsQuery_disease | null;
}

export interface UniprotVariantsQueryVariables {
  ensemblId: string;
  efoId: string;
  size: number;
}
