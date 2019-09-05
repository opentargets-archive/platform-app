import React from 'react';
import gql from 'graphql-tag';

import FacetCheckbox from '../../common/FacetCheckbox';
import FacetFormGroup from '../../common/FacetFormGroup';

export const id = 'pathways';
export const name = 'Pathways';

export const facetQuery = gql`
  fragment diseaseTargetsConnectionPathwaysFragment on DiseaseTargetsConnectionFacets {
    pathways {
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
    if (state.pathwayIds.indexOf(item.itemId) >= 0) {
      // switch off
      newPathwayIds = state.pathwayIds.filter(d => d !== item.itemId);
    } else {
      // switch on
      newPathwayIds = [item.itemId, ...state.pathwayIds];
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
      <FacetFormGroup>
        {data.items.map(item => {
          const checkedChildren = item.children.filter(
            childItem => state.pathwayIds.indexOf(childItem.itemId) >= 0
          );
          const indeterminate =
            item.children.length > 0 &&
            checkedChildren.length > 0 &&
            checkedChildren.length < item.children.length;
          const nested = item.children.length > 0;
          return (
            <FacetCheckbox
              key={item.itemId}
              nested={nested}
              indeterminate={indeterminate}
              checked={state.pathwayIds.indexOf(item.itemId) >= 0}
              onChange={this.handleFacetChange(item)}
              value={item.itemId}
              label={`${item.name} (${item.count})`}
            >
              {item.children.map(childItem => (
                <FacetCheckbox
                  key={childItem.itemId}
                  checked={state.pathwayIds.indexOf(childItem.itemId) >= 0}
                  onChange={this.handleFacetChange(childItem)}
                  value={childItem.itemId}
                  label={`${childItem.name} (${childItem.count})`}
                />
              ))}
            </FacetCheckbox>
          );
        })}
      </FacetFormGroup>
    );
  }
}
