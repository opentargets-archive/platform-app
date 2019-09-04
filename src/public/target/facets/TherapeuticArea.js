import React from 'react';
import gql from 'graphql-tag';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import FacetCheckbox from '../../common/FacetCheckbox';

export const id = 'therapeuticArea';
export const name = 'Therapeutic Area';

export const facetQuery = gql`
  fragment targetDiseasesConnectionTherapeuticAreaFragment on TargetDiseasesConnectionFacets {
    therapeuticArea {
      items {
        itemId
        name
        count
      }
    }
  }
`;

export const stateDefault = [];
export const stateToInput = state =>
  state.length > 0 ? { efoIds: state } : null;

export const FacetComponent = ({ state, data, onFacetChange }) => (
  <FormControl component="fieldset">
    <FormGroup>
      {data.items.map(item => (
        <FacetCheckbox
          key={item.itemId}
          checked={state.indexOf(item.itemId) >= 0}
          onChange={() => {
            let newState;
            if (state.indexOf(item.itemId) >= 0) {
              // switch off
              newState = state.filter(d => d !== item.itemId);
            } else {
              // switch on
              newState = [item.itemId, ...state];
            }

            // update
            onFacetChange(newState);
          }}
          value={item.itemId}
          label={`${item.name} (${item.count})`}
        />
      ))}
    </FormGroup>
  </FormControl>
);
