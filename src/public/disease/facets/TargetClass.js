import React from 'react';
import gql from 'graphql-tag';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import FacetCheckbox from '../../common/FacetCheckbox';

export const id = 'targetClass';
export const name = 'Target Class';

export const facetQuery = gql`
  fragment diseaseTargetsConnectionTargetClassFragment on DiseaseTargetsConnectionFacets {
    targetClass {
      items {
        itemId
        name
        count
        children {
          itemId
          name
          count
        }
      }
    }
  }
`;

export const stateDefault = {
  targetClassIds: [],
};
export const stateToInput = state => {
  const input = {};
  if (state.targetClassIds.length > 0) {
    input.targetClassIds = state.targetClassIds;
  }
  return input;
};

export class FacetComponent extends React.Component {
  handleFacetChange = item => () => {
    const { state, onFacetChange } = this.props;
    let newTargetClassIds;
    if (state.targetClassIds.indexOf(item.itemId) >= 0) {
      // switch off
      newTargetClassIds = state.targetClassIds.filter(d => d !== item.itemId);
    } else {
      // switch on
      newTargetClassIds = [item.itemId, ...state.targetClassIds];
    }
    const newState = {
      ...state,
      targetClassIds: newTargetClassIds,
    };

    // update
    onFacetChange(newState);
  };
  render() {
    const { state, data } = this.props;
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {data.items.map(item => (
            <FacetCheckbox
              key={item.itemId}
              nested
              checked={state.targetClassIds.indexOf(item.itemId) >= 0}
              onChange={this.handleFacetChange(item)}
              value={item.itemId}
              label={`${item.name} (${item.count})`}
            >
              {item.children.map(childItem => (
                <FacetCheckbox
                  key={childItem.itemId}
                  nested
                  checked={state.targetClassIds.indexOf(childItem.itemId) >= 0}
                  onChange={this.handleFacetChange(childItem)}
                  value={childItem.itemId}
                  label={`${childItem.name} (${childItem.count})`}
                />
              ))}
            </FacetCheckbox>
          ))}
        </FormGroup>
      </FormControl>
    );
  }
}
