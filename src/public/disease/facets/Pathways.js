import React from 'react';
import gql from 'graphql-tag';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import FacetCheckbox from '../../common/FacetCheckbox';

export const id = 'pathways';
export const name = 'Pathways';

export const facetQuery = gql`
  fragment diseaseTargetsConnectionPathwaysFragment on DiseaseTargetsConnectionFacets {
    pathways {
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

export const stateDefault = {
  pathwayIds: [],
};
export const stateToInput = state => {
  const input = {};
  if (state.pathwayIds.length > 0) {
    input.pathwayIds = state.pathwayIds;
  }
  return input;
};

export class FacetComponent extends React.Component {
  handleFacetChange = item => () => {
    const { state, onFacetChange } = this.props;
    let newPathwayIds;
    if (state.pathwayIds.indexOf(item.id) >= 0) {
      // switch off
      newPathwayIds = state.pathwayIds.filter(d => d !== item.id);
    } else {
      // switch on
      newPathwayIds = [item.id, ...state.pathwayIds];
    }
    const newState = {
      ...state,
      pathwayIds: newPathwayIds,
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
              key={item.id}
              nested
              checked={state.pathwayIds.indexOf(item.id) >= 0}
              onChange={this.handleFacetChange(item)}
              value={item.id}
              label={`${item.name} (${item.count})`}
            >
              {item.children.map(childItem => (
                <FacetCheckbox
                  key={childItem.id}
                  nested
                  checked={state.pathwayIds.indexOf(childItem.id) >= 0}
                  onChange={this.handleFacetChange(childItem)}
                  value={childItem.id}
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
