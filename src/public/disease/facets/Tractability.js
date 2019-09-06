import React from 'react';
import gql from 'graphql-tag';

import FacetFormGroup from '../../common/FacetFormGroup';
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
  handleParentFacetChange = (wasChecked, childIds) => () => {
    const { state, onFacetChange } = this.props;
    let newTractabilityIds;
    if (wasChecked) {
      // switch off
      newTractabilityIds = state.tractabilityIds.filter(
        d => !(childIds.indexOf(d) >= 0)
      );
    } else {
      // switch on
      const otherTractabilityIds = state.tractabilityIds.filter(
        d => !(childIds.indexOf(d) >= 0)
      );
      newTractabilityIds = [...childIds, ...otherTractabilityIds];
    }
    const newState = {
      ...state,
      tractabilityIds: newTractabilityIds,
    };

    // update
    onFacetChange(newState);
  };
  getParentState = () => {
    // note: there are checkboxes for small molecule and antibody,
    //       but this state is purely managed by the front-end,
    //       not the api
    const { state, data } = this.props;

    // small molecule
    const itemsSmallMolecule = data.items.filter(item =>
      item.itemId.startsWith('SMALLMOLECULE')
    );
    const checkedChildrenSmallMolecule = itemsSmallMolecule.filter(
      item => state.tractabilityIds.indexOf(item.itemId) >= 0
    );
    const checkedSmallMolecule =
      itemsSmallMolecule.length > 0 &&
      checkedChildrenSmallMolecule.length === itemsSmallMolecule.length;
    const indeterminateSmallMolecule =
      itemsSmallMolecule.length > 0 &&
      checkedChildrenSmallMolecule.length > 0 &&
      checkedChildrenSmallMolecule.length < itemsSmallMolecule.length;
    const handlerSmallMolecule = this.handleParentFacetChange(
      checkedSmallMolecule,
      itemsSmallMolecule.map(d => d.itemId)
    );

    // antibody
    const itemsAntibody = data.items.filter(item =>
      item.itemId.startsWith('ANTIBODY')
    );
    const checkedChildrenAntibody = itemsAntibody.filter(
      item => state.tractabilityIds.indexOf(item.itemId) >= 0
    );
    const checkedAntibody =
      itemsAntibody.length > 0 &&
      checkedChildrenAntibody.length === itemsAntibody.length;
    const indeterminateAntibody =
      itemsAntibody.length > 0 &&
      checkedChildrenAntibody.length > 0 &&
      checkedChildrenAntibody.length < itemsAntibody.length;
    const handlerAntibody = this.handleParentFacetChange(
      checkedAntibody,
      itemsAntibody.map(d => d.itemId)
    );

    // derived state
    return {
      smallMolecule: {
        checked: checkedSmallMolecule,
        indeterminate: indeterminateSmallMolecule,
        items: itemsSmallMolecule,
        handler: handlerSmallMolecule,
      },
      antibody: {
        checked: checkedAntibody,
        indeterminate: indeterminateAntibody,
        items: itemsAntibody,
        handler: handlerAntibody,
      },
    };
  };
  render() {
    const { state } = this.props;
    const { smallMolecule, antibody } = this.getParentState();
    return (
      <FacetFormGroup>
        <FacetCheckbox
          nested
          alwaysExpanded
          checked={smallMolecule.checked}
          indeterminate={smallMolecule.indeterminate}
          onChange={smallMolecule.handler}
          label="Small Molecule"
        >
          {smallMolecule.items.map(item => (
            <FacetCheckbox
              key={item.itemId}
              checked={state.tractabilityIds.indexOf(item.itemId) >= 0}
              onChange={this.handleFacetChange(item)}
              value={item.itemId}
              label={`${item.name} (${item.count})`}
            />
          ))}
        </FacetCheckbox>
        <FacetCheckbox
          nested
          alwaysExpanded
          checked={antibody.checked}
          indeterminate={antibody.indeterminate}
          onChange={antibody.handler}
          label="Antibody"
        >
          {antibody.items.map(item => (
            <FacetCheckbox
              key={item.itemId}
              checked={state.tractabilityIds.indexOf(item.itemId) >= 0}
              onChange={this.handleFacetChange(item)}
              value={item.itemId}
              label={`${item.name} (${item.count})`}
            />
          ))}
        </FacetCheckbox>
      </FacetFormGroup>
    );
  }
}
