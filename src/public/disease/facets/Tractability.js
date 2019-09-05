import React from 'react';
import gql from 'graphql-tag';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import FacetCheckbox from '../../common/FacetCheckbox';

export const id = 'tractability';
export const name = 'Tractability';

export const facetQuery = gql`
  fragment diseaseTargetsConnectionTractabilityFragment on DiseaseTargetsConnectionFacets {
    tractability {
      items {
        itemId
        name
        count
      }
    }
  }
`;

export const stateDefault = {
  tractabilityIds: [],
};
export const stateToInput = state => {
  const input = {};
  if (state.tractabilityIds.length > 0) {
    input.tractabilityIds = state.tractabilityIds;
  }
  return input;
};

export class FacetComponent extends React.Component {
  handleFacetChange = item => () => {
    const { state, onFacetChange } = this.props;
    let newTractabilityIds;
    if (state.tractabilityIds.indexOf(item.itemId) >= 0) {
      // switch off
      newTractabilityIds = state.tractabilityIds.filter(d => d !== item.itemId);
    } else {
      // switch on
      newTractabilityIds = [item.itemId, ...state.tractabilityIds];
    }
    const newState = {
      ...state,
      tractabilityIds: newTractabilityIds,
    };

    // update
    onFacetChange(newState);
  };
  render() {
    const { state, data } = this.props;
    return (
      <FormControl component="fieldset">
        <FormGroup>
          <FacetCheckbox nested noCheckbox label="Small Molecule">
            {data.items
              .filter(item => item.itemId.startsWith('SMALLMOLECULE'))
              .map(item => (
                <FacetCheckbox
                  key={item.itemId}
                  nested
                  checked={state.tractabilityIds.indexOf(item.itemId) >= 0}
                  onChange={this.handleFacetChange(item)}
                  value={item.itemId}
                  label={`${item.name} (${item.count})`}
                />
              ))}
          </FacetCheckbox>
          <FacetCheckbox nested noCheckbox label="Antibody">
            {data.items
              .filter(item => item.itemId.startsWith('ANTIBODY'))
              .map(item => (
                <FacetCheckbox
                  key={item.itemId}
                  nested
                  checked={state.tractabilityIds.indexOf(item.itemId) >= 0}
                  onChange={this.handleFacetChange(item)}
                  value={item.itemId}
                  label={`${item.name} (${item.count})`}
                />
              ))}
          </FacetCheckbox>
        </FormGroup>
      </FormControl>
    );
  }
}
