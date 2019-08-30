import React from 'react';
import gql from 'graphql-tag';

export const id = 'dataTypeAndSource';
export const name = 'Data Type and Source';

export const facetQuery = gql`
  fragment targetDiseasesConnectionDataTypeAndSourceFragment on TargetDiseasesConnectionFacets {
    dataTypeAndSource {
      items {
        id
        name
        count
        children {
          id
          name
          count
        }
      }
    }
  }
`;

export const FacetComponent = () => <div>data type and source</div>;
