import React from 'react';
import * as d3 from 'd3';
import gql from 'graphql-tag';
import RadioGroup from '@material-ui/core/RadioGroup';

import FacetCheckbox from '../../common/FacetCheckbox';
import FacetRadio from '../../common/FacetRadio';
import FacetFormGroup from '../../common/FacetFormGroup';

export const id = 'tissueSpecificity';
export const name = 'Tissue Specificity (Baseline RNA Expression)';

export const facetQuery = gql`
  fragment diseaseTargetsConnectionTissueSpecificityFragment on DiseaseTargetsConnectionFacets {
    tissueSpecificity {
      items {
        itemId
        name
        organs
        anatomicalSystems
      }
    }
  }
`;

export const stateDefault = {
  tissueIds: [],
};
export const stateToInput = state => {
  const input = {};
  if (state.tissueIds.length > 0) {
    input.tissueIds = state.tissueIds;
  }
  return input;
};

const tissueNameComparator = (a, b) => d3.ascending(a.name, b.name);

export class FacetComponent extends React.Component {
  state = {
    groupTissuesBy: 'noGrouping',
  };
  handleGroupTissuesByChange = event => {
    this.setState({ groupTissuesBy: event.target.value });
  };
  handleFacetChange = item => () => {
    const { state, onFacetChange } = this.props;
    let newTissueIds;
    if (state.tissueIds.indexOf(item.itemId) >= 0) {
      // switch off
      newTissueIds = state.tissueIds.filter(d => d !== item.itemId);
    } else {
      // switch on
      newTissueIds = [item.itemId, ...state.tissueIds];
    }
    const newState = {
      ...state,
      tissueIds: newTissueIds,
    };

    // update
    onFacetChange(newState);
  };
  render() {
    const { state, data } = this.props;
    const tissuesByOrgan = data.items.reduce((acc, d) => {
      const { itemId, name, organs } = d;
      const tissue = { itemId, name };
      organs.forEach(o => {
        if (acc[o]) {
          acc[o].push(tissue);
        } else {
          acc[o] = [tissue];
        }
      });
      return acc;
    }, {});
    const tissuesByAnatomicalSystem = data.items.reduce((acc, d) => {
      const { itemId, name, anatomicalSystems } = d;
      const tissue = { itemId, name };
      anatomicalSystems.forEach(a => {
        if (acc[a]) {
          acc[a].push(tissue);
        } else {
          acc[a] = [tissue];
        }
      });
      return acc;
    }, {});
    return (
      <FacetFormGroup>
        <FacetCheckbox nested noCheckbox label="Group tissues by">
          <RadioGroup
            aria-label="group tissues by"
            name="groupTissuesBy"
            value={this.state.groupTissuesBy}
            onChange={this.handleGroupTissuesByChange}
          >
            <FacetRadio value="noGrouping" label="No Grouping" />
            <FacetRadio value="organ" label="Organ" />
            <FacetRadio value="anatomicalSystem" label="Anatomical System" />
          </RadioGroup>
        </FacetCheckbox>

        {this.state.groupTissuesBy === 'noGrouping' ? (
          <FacetCheckbox nested noCheckbox label="Tissues">
            {data.items.sort(tissueNameComparator).map(item => (
              <FacetCheckbox
                key={item.itemId}
                checked={state.tissueIds.indexOf(item.itemId) >= 0}
                onChange={this.handleFacetChange(item)}
                value={item.itemId}
                label={item.name}
              />
            ))}
          </FacetCheckbox>
        ) : null}
        {this.state.groupTissuesBy === 'organ' ? (
          <React.Fragment>
            {Object.keys(tissuesByOrgan)
              .sort()
              .map(organ => (
                <FacetCheckbox key={organ} nested noCheckbox label={organ}>
                  {tissuesByOrgan[organ]
                    .sort(tissueNameComparator)
                    .map(item => (
                      <FacetCheckbox
                        key={item.itemId}
                        checked={state.tissueIds.indexOf(item.itemId) >= 0}
                        onChange={this.handleFacetChange(item)}
                        value={item.itemId}
                        label={item.name}
                      />
                    ))}
                </FacetCheckbox>
              ))}
          </React.Fragment>
        ) : null}
        {this.state.groupTissuesBy === 'anatomicalSystem' ? (
          <React.Fragment>
            {Object.keys(tissuesByAnatomicalSystem)
              .sort()
              .map(anatomicalSystem => (
                <FacetCheckbox
                  key={anatomicalSystem}
                  nested
                  noCheckbox
                  label={anatomicalSystem}
                >
                  {tissuesByAnatomicalSystem[anatomicalSystem]
                    .sort(tissueNameComparator)
                    .map(item => (
                      <FacetCheckbox
                        key={item.itemId}
                        checked={state.tissueIds.indexOf(item.itemId) >= 0}
                        onChange={this.handleFacetChange(item)}
                        value={item.itemId}
                        label={item.name}
                      />
                    ))}
                </FacetCheckbox>
              ))}
          </React.Fragment>
        ) : null}
      </FacetFormGroup>
    );
  }
}
