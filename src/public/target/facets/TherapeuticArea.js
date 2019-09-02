import React from 'react';
import gql from 'graphql-tag';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export const stateDefault = [];
export const stateToInput = state =>
  state.length > 0 ? { efoIds: state } : null;

export const FacetComponent = ({ state, data, onFacetChange }) => (
  <div>
    <FormControl component="fieldset">
      <FormLabel component="legend">{name}</FormLabel>
      <FormGroup>
        {data.items.map(item => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={state.indexOf(item.id) >= 0}
                onChange={() => {
                  let newState;
                  if (state.indexOf(item.id) >= 0) {
                    // switch off
                    newState = state.filter(d => d !== item.id);
                  } else {
                    // switch on
                    newState = [item.id, ...state];
                  }

                  // update
                  onFacetChange(newState);
                }}
                value={item.id}
              />
            }
            label={`${item.name} (${item.count})`}
          />
        ))}
      </FormGroup>
    </FormControl>
  </div>
);
