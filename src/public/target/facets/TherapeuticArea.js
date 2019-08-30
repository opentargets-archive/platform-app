import React from 'react';
import gql from 'graphql-tag';

export const id = 'therapeuticArea';
export const name = 'Therapeutic Area';

export const facetQuery = gql`
  fragment targetDiseasesConnectionTherapeuticAreaFragment on TargetDiseasesConnectionFacets {
    therapeuticArea {
      items {
        id
        name
        count
      }
    }
  }
`;

export const FacetComponent = () => <div>therapeutic area</div>;
