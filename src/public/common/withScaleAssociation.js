import React, { Component } from 'react';
import * as d3 from 'd3';
import { lighten } from 'polished';
import withTheme from '@material-ui/core/styles/withTheme';

function withScaleAssociation(WrappedComponent) {
  return withTheme()(
    class extends Component {
      render() {
        console.log(this.props);
        const { theme, ...rest } = this.props;
        const scaleAssociation = d3
          .scaleLinear()
          .domain([0, 1])
          .range([
            lighten(0.4, theme.palette.primary.main),
            theme.palette.primary.main,
          ])
          .unknown('#fff');
        return (
          <WrappedComponent scaleAssociation={scaleAssociation} {...rest} />
        );
      }
    }
  );
}

export default withScaleAssociation;
