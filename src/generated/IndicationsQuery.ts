/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndicationsQuery
// ====================================================

export interface IndicationsQuery_drug_indications_rows_disease_therapeuticAreas {
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

export interface IndicationsQuery_drug_indications_rows_disease {
  __typename: "Disease";
  /**
   * Open Targets disease id
   */
  id: string;
  /**
   * Disease name
   */
  name: string;
  /**
   * Ancestor therapeutic area disease entities in ontology
   */
  therapeuticAreas: IndicationsQuery_drug_indications_rows_disease_therapeuticAreas[];
}

export interface IndicationsQuery_drug_indications_rows_references {
  __typename: "IndicationReference";
  ids: string[] | null;
  source: string;
}

export interface IndicationsQuery_drug_indications_rows {
  __typename: "IndicationRow";
  maxPhaseForIndication: any;
  /**
   * Disease
   */
  disease: IndicationsQuery_drug_indications_rows_disease;
  references: IndicationsQuery_drug_indications_rows_references[] | null;
}

export interface IndicationsQuery_drug_indications {
  __typename: "Indications";
  rows: IndicationsQuery_drug_indications_rows[];
}

export interface IndicationsQuery_drug {
  __typename: "Drug";
  /**
   * Open Targets molecule id
   */
  id: string;
  /**
   * Investigational and approved indications curated from clinical trial records and post-marketing package inserts
   */
  indications: IndicationsQuery_drug_indications | null;
}

export interface IndicationsQuery {
  /**
   * Return a drug
   */
  drug: IndicationsQuery_drug | null;
}

export interface IndicationsQueryVariables {
  chemblId: string;
}
