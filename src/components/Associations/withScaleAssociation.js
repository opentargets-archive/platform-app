import React, { Component } from 'react';
import * as d3 from 'd3';
import { mix, complement, lighten } from 'polished';
import { withTheme } from '@material-ui/core';

function withScaleAssociation(WrappedComponent) {
  return withTheme(
    class extends Component {
      render() {
        const { theme, ...rest } = this.props;
        const scaleAssociation = d3
          .scaleLinear()
          .domain([0, 1])
          .range([
            lighten(0.4, theme.palette.primary.main),
            theme.palette.primary.main,
          ])
          .unknown('#fff');
        const tractabilityColor = complement(
          mix(0.3, theme.palette.primary.main, theme.palette.secondary.main)
        );
        const scaleModality = d3
          .scalePow()
          .exponent(0.5)
          .range([lighten(0.4, tractabilityColor), tractabilityColor])
          .unknown('#fff');
        return (
          <WrappedComponent
            {...{ scaleAssociation, scaleModality }}
            {...rest}
          />
        );
      }
    }
  );
}

export default withScaleAssociation;
