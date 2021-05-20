/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TargetSimilarEntitiesQuery
// ====================================================

export interface TargetSimilarEntitiesQuery_target_similarEntities_object_Target {
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

export interface TargetSimilarEntitiesQuery_target_similarEntities_object_Drug {
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

export interface TargetSimilarEntitiesQuery_target_similarEntities_object_Disease {
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

export type TargetSimilarEntitiesQuery_target_similarEntities_object = TargetSimilarEntitiesQuery_target_similarEntities_object_Target | TargetSimilarEntitiesQuery_target_similarEntities_object_Drug | TargetSimilarEntitiesQuery_target_similarEntities_object_Disease;

export interface TargetSimilarEntitiesQuery_target_similarEntities {
  __typename: "Similarity";
  score: number;
  /**
   * Similarity label optionally resolved into an entity
   */
  object: TargetSimilarEntitiesQuery_target_similarEntities_object | null;
}

export interface TargetSimilarEntitiesQuery_target_literatureOcurrences_rows_sentences_matches {
  __typename: "Match";
  mappedId: string;
  matchedLabel: string;
  sectionStart: any | null;
  sectionEnd: any | null;
  startInSentence: any;
  endInSentence: any;
}

export interface TargetSimilarEntitiesQuery_target_literatureOcurrences_rows_sentences {
  __typename: "Sentence";
  /**
   * Section of the publication (either title or abstract)
   */
  section: string;
  /**
   * List of matches
   */
  matches: TargetSimilarEntitiesQuery_target_literatureOcurrences_rows_sentences_matches[];
}

export interface TargetSimilarEntitiesQuery_target_literatureOcurrences_rows {
  __typename: "Publication";
  pmid: string;
  pmcid: string | null;
  /**
   * Publication Date
   */
  publicationDate: string | null;
  /**
   * Unique counts per matched keyword
   */
  sentences: TargetSimilarEntitiesQuery_target_literatureOcurrences_rows_sentences[] | null;
}

export interface TargetSimilarEntitiesQuery_target_literatureOcurrences {
  __typename: "Publications";
  count: any;
  cursor: string | null;
  rows: TargetSimilarEntitiesQuery_target_literatureOcurrences_rows[];
}

export interface TargetSimilarEntitiesQuery_target {
  __typename: "Target";
  /**
   * Open Targets target id
   */
  id: string;
  /**
   * Approved gene name
   */
  approvedName: string;
  /**
   * Return similar labels using a model Word2CVec trained with PubMed
   */
  similarEntities: TargetSimilarEntitiesQuery_target_similarEntities[];
  /**
   * Return the list of publications that mention the main entity, alone or in combination with other entities
   */
  literatureOcurrences: TargetSimilarEntitiesQuery_target_literatureOcurrences;
}

export interface TargetSimilarEntitiesQuery {
  /**
   * Return a Target
   */
  target: TargetSimilarEntitiesQuery_target | null;
}

export interface TargetSimilarEntitiesQueryVariables {
  id: string;
  ids?: string[] | null;
  threshold?: number | null;
  size: number;
  entityNames?: string[] | null;
  cursor?: string | null;
}
