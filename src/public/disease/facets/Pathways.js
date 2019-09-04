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
    // console.log('parents', data.items.length);
    // console.log(
    //   'children',
    //   data.items.reduce((acc, d) => (acc += d.children.length), 0)
    // );
    // const uniqueItems = data.items.reduce((acc, d) => {
    //   acc[d.id] = true;
    //   d.children.forEach(c => {
    //     acc[c.id] = true;
    //   });
    //   return acc;
    // }, {});
    // console.log('unique', Object.keys(uniqueItems).length);
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {data.items.map(item => (
            <FacetCheckbox
              key={item.itemId}
              nested
              checked={state.pathwayIds.indexOf(item.itemId) >= 0}
              onChange={this.handleFacetChange(item)}
              value={item.itemId}
              label={`${item.name} (${item.count})`}
            >
              {item.children.map(childItem => (
                <FacetCheckbox
                  key={childItem.itemId}
                  nested
                  checked={state.pathwayIds.indexOf(childItem.itemId) >= 0}
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
