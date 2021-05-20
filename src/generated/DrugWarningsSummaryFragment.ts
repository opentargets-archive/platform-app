/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DrugWarningsSummaryFragment
// ====================================================

export interface DrugWarningsSummaryFragment {
  __typename: "Drug";
  /**
   * Has drug been withdrawn from the market
   */
  hasBeenWithdrawn: boolean;
  /**
   * Alert on life-threteaning drug side effects provided by FDA
   */
  blackBoxWarning: boolean;
}
