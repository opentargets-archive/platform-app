/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InteractionsStatsQuery
// ====================================================

export interface InteractionsStatsQuery_interactionResources {
  __typename: "InteractionResources";
  databaseVersion: string;
  sourceDatabase: string;
}

export interface InteractionsStatsQuery_target_intact {
  __typename: "Interactions";
  count: any;
}

export interface InteractionsStatsQuery_target_signor {
  __typename: "Interactions";
  count: any;
}

export interface InteractionsStatsQuery_target_reactome {
  __typename: "Interactions";
  count: any;
}

export interface InteractionsStatsQuery_target_string {
  __typename: "Interactions";
  count: any;
}

export interface InteractionsStatsQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Biological pathway membership from Reactome
   */
  intact: InteractionsStatsQuery_target_intact | null;
  /**
   * Biological pathway membership from Reactome
   */
  signor: InteractionsStatsQuery_target_signor | null;
  /**
   * Biological pathway membership from Reactome
   */
  reactome: InteractionsStatsQuery_target_reactome | null;
  /**
   * Biological pathway membership from Reactome
   */
  string: InteractionsStatsQuery_target_string | null;
}

export interface InteractionsStatsQuery {
  /**
   * The complete list of all possible datasources
   */
  interactionResources: InteractionsStatsQuery_interactionResources[];
  /**
   * Return a Target
   */
  target: InteractionsStatsQuery_target | null;
}

export interface InteractionsStatsQueryVariables {
  ensgId: string;
}
