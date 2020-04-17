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
export const stateToInput = (state) => {
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
  handleGroupTissuesByChange = (event) => {
    this.setState({ groupTissuesBy: event.target.value });
  };
  handleFacetChange = (item) => () => {
    const { state, onFacetChange } = this.props;
    let newTissueIds;
    if (state.tissueIds.indexOf(item.itemId) >= 0) {
      // switch off
      newTissueIds = state.tissueIds.filter((d) => d !== item.itemId);
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
  handleParentFacetChange = (wasChecked, childIds) => () => {
    const { state, onFacetChange } = this.props;
    let newTissueIds;
    if (wasChecked) {
      // switch off
      newTissueIds = state.tissueIds.filter((d) => !(childIds.indexOf(d) >= 0));
    } else {
      // switch on
      const otherTissueIds = state.tissueIds.filter(
        (d) => !(childIds.indexOf(d) >= 0)
      );
      newTissueIds = [...childIds, ...otherTissueIds];
    }
    const newState = {
      ...state,
      tissueIds: newTissueIds,
    };

    // update
    onFacetChange(newState);
  };
  getParentState = () => {
    // note: there are checkboxes for small molecule and antibody,
    //       but this state is purely managed by the front-end,
    //       not the api
    const { state, data } = this.props;

    // organs
    const tissuesByOrgan = data.items.reduce((acc, d) => {
      const { itemId, name, organs } = d;
      const tissue = { itemId, name };
      organs.forEach((o) => {
        if (acc[o]) {
          acc[o].push(tissue);
        } else {
          acc[o] = [tissue];
        }
      });
      return acc;
    }, {});
    const organs = Object.keys(tissuesByOrgan)
      .sort()
      .map((organ) => {
        const tissues = tissuesByOrgan[organ];
        const checkedChildren = tissues.filter(
          (item) => state.tissueIds.indexOf(item.itemId) >= 0
        );
        const checked =
          tissues.length > 0 && checkedChildren.length === tissues.length;
        const indeterminate =
          tissues.length > 0 &&
          checkedChildren.length > 0 &&
          checkedChildren.length < tissues.length;
        const handler = this.handleParentFacetChange(
          checked,
          tissues.map((d) => d.itemId)
        );
        return {
          name: organ,
          tissues,
          checked,
          indeterminate,
          handler,
        };
      });

    // anatomical systems
    const tissuesByAnatomicalSystem = data.items.reduce((acc, d) => {
      const { itemId, name, anatomicalSystems } = d;
      const tissue = { itemId, name };
      anatomicalSystems.forEach((a) => {
        if (acc[a]) {
          acc[a].push(tissue);
        } else {
          acc[a] = [tissue];
        }
      });
      return acc;
    }, {});
    const anatomicalSystems = Object.keys(tissuesByAnatomicalSystem)
      .sort()
      .map((anatomicalSystem) => {
        const tissues = tissuesByAnatomicalSystem[anatomicalSystem];
        const checkedChildren = tissues.filter(
          (item) => state.tissueIds.indexOf(item.itemId) >= 0
        );
        const checked =
          tissues.length > 0 && checkedChildren.length === tissues.length;
        const indeterminate =
          tissues.length > 0 &&
          checkedChildren.length > 0 &&
          checkedChildren.length < tissues.length;
        const handler = this.handleParentFacetChange(
          checked,
          tissues.map((d) => d.itemId)
        );
        return {
          name: anatomicalSystem,
          tissues,
          checked,
          indeterminate,
          handler,
        };
      });

    // derived state
    return {
      organs,
      anatomicalSystems,
    };
  };
  render() {
    const { state, data } = this.props;
    const { organs, anatomicalSystems } = this.getParentState();
    return (
      <FacetFormGroup>
        <FacetCheckbox
          nested
          alwaysExpanded
          noCheckbox
          label="Group tissues by"
        >
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

        {/* just tissues */}
        {this.state.groupTissuesBy === 'noGrouping' ? (
          <FacetCheckbox nested alwaysExpanded noCheckbox label="Tissues">
            {data.items.sort(tissueNameComparator).map((item) => (
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

        {/* tissues aggregated by organ */}
        {this.state.groupTissuesBy === 'organ' ? (
          <React.Fragment>
            {organs.map((organ) => (
              <FacetCheckbox
                key={organ.name}
                nested
                checked={organ.checked}
                indeterminate={organ.indeterminate}
                onChange={organ.handler}
                label={organ.name}
              >
                {organ.tissues.sort(tissueNameComparator).map((item) => (
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

        {/* tissues aggregated by anatomical system */}
        {this.state.groupTissuesBy === 'anatomicalSystem' ? (
          <React.Fragment>
            {anatomicalSystems.map((anatomicalSystem) => (
              <FacetCheckbox
                key={anatomicalSystem.name}
                nested
                checked={anatomicalSystem.checked}
                indeterminate={anatomicalSystem.indeterminate}
                onChange={anatomicalSystem.handler}
                label={anatomicalSystem.name}
              >
                {anatomicalSystem.tissues
                  .sort(tissueNameComparator)
                  .map((item) => (
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
