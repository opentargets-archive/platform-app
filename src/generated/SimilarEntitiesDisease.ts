/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SimilarEntitiesDisease
// ====================================================

export interface SimilarEntitiesDisease_similarEntities {
  __typename: "Similarity";
  score: number;
}

export interface SimilarEntitiesDisease {
  __typename: "Disease";
  /**
   * Return similar labels using a model Word2CVec trained with PubMed
   */
  similarEntities: SimilarEntitiesDisease_similarEntities[];
}
