import React from 'react';
import gql from 'graphql-tag';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import FacetCheckbox from '../../common/FacetCheckbox';

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

export const stateDefault = {
  dataTypeIds: [],
  dataSourceIds: [],
};
export const stateToInput = state => {
  const input = {};
  if (state.dataTypeIds.length > 0) {
    input.dataTypeIds = state.dataTypeIds;
  }
  if (state.dataSourceIds.length > 0) {
    input.dataSourceIds = state.dataSourceIds;
  }
  return input;
};

export const FacetComponent = ({ state, data, onFacetChange }) => (
  <div>
    <FormControl component="fieldset">
      <FormGroup>
        {data.items.map(item => (
          <FacetCheckbox
            key={item.id}
            nested
            checked={state.dataTypeIds.indexOf(item.id) >= 0}
            onChange={() => {
              let newDataTypeIds;
              if (state.dataTypeIds.indexOf(item.id) >= 0) {
                // switch off
                newDataTypeIds = state.dataTypeIds.filter(d => d !== item.id);
              } else {
                // switch on
                newDataTypeIds = [item.id, ...state.dataTypeIds];
              }
              const newState = {
                ...state,
                dataTypeIds: newDataTypeIds,
              };

              // update
              onFacetChange(newState);
            }}
            value={item.id}
            label={`${item.name} (${item.count})`}
          >
            {item.children.map(childItem => (
              <FacetCheckbox
                key={childItem.id}
                nested
                checked={state.dataSourceIds.indexOf(childItem.id) >= 0}
                onChange={() => {
                  let newDataSourceIds;
                  if (state.dataSourceIds.indexOf(childItem.id) >= 0) {
                    // switch off
                    newDataSourceIds = state.dataSourceIds.filter(
                      d => d !== childItem.id
                    );
                  } else {
                    // switch on
                    newDataSourceIds = [childItem.id, ...state.dataSourceIds];
                  }
                  const newState = {
                    ...state,
                    dataSourceIds: newDataSourceIds,
                  };

                  // update
                  onFacetChange(newState);
                }}
                value={childItem.id}
                label={`${childItem.name} (${childItem.count})`}
              />
            ))}
          </FacetCheckbox>
        ))}
      </FormGroup>
    </FormControl>
  </div>
);
