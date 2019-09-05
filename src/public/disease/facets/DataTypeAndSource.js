import React from 'react';
import gql from 'graphql-tag';

import FacetCheckbox from '../../common/FacetCheckbox';
import FacetFormGroup from '../../common/FacetFormGroup';

export const id = 'dataTypeAndSource';
export const name = 'Data Type and Source';

export const facetQuery = gql`
  fragment diseaseTargetsConnectionDataTypeAndSourceFragment on DiseaseTargetsConnectionFacets {
    dataTypeAndSource {
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
  <FacetFormGroup>
    {data.items.map(item => (
      <FacetCheckbox
        key={item.itemId}
        nested
        checked={state.dataTypeIds.indexOf(item.itemId) >= 0}
        disabled={item.count === 0}
        onChange={() => {
          let newDataTypeIds;
          if (state.dataTypeIds.indexOf(item.itemId) >= 0) {
            // switch off
            newDataTypeIds = state.dataTypeIds.filter(d => d !== item.itemId);
          } else {
            // switch on
            newDataTypeIds = [item.itemId, ...state.dataTypeIds];
          }
          const newState = {
            ...state,
            dataTypeIds: newDataTypeIds,
          };

          // update
          onFacetChange(newState);
        }}
        value={item.itemId}
        label={`${item.name} (${item.count})`}
      >
        {item.children.map(childItem => (
          <FacetCheckbox
            key={childItem.itemId}
            checked={state.dataSourceIds.indexOf(childItem.itemId) >= 0}
            onChange={() => {
              let newDataSourceIds;
              if (state.dataSourceIds.indexOf(childItem.itemId) >= 0) {
                // switch off
                newDataSourceIds = state.dataSourceIds.filter(
                  d => d !== childItem.itemId
                );
              } else {
                // switch on
                newDataSourceIds = [childItem.itemId, ...state.dataSourceIds];
              }
              const newState = {
                ...state,
                dataSourceIds: newDataSourceIds,
              };

              // update
              onFacetChange(newState);
            }}
            value={childItem.itemId}
            label={`${childItem.name} (${childItem.count})`}
          />
        ))}
      </FacetCheckbox>
    ))}
  </FacetFormGroup>
);
