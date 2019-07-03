import React from 'react';
import withTheme from '@material-ui/core/styles/withTheme';
import * as d3 from 'd3';

const WIDTH = 400;
const HEIGHT = 18;

const LinearVenn = ({ theme, aOnly, aAndB, bOnly, max }) => {
  const aOnlyStart = 0;
  const aOnlyWidth = (WIDTH * aOnly) / max;
  const aAndBStart = aOnlyStart + aOnlyWidth;
  const aAndBWidth = (WIDTH * aAndB) / max;
  const bOnlyStart = aAndBStart + aAndBWidth;
  const bOnlyWidth = (WIDTH * bOnly) / max;

  const halfwayColour = d3.interpolateRgb(
    d3.rgb(theme.palette.primary.main),
    d3.rgb(theme.palette.secondary.main)
  )(0.5);

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <g>
        <rect
          x={aOnlyStart}
          y={0}
          width={aOnlyWidth + aAndBWidth}
          height={HEIGHT}
          fill={theme.palette.primary.main}
          stroke={'white'}
        />
        <rect
          x={aAndBStart}
          y={0}
          width={aAndBWidth}
          height={HEIGHT}
          fill={halfwayColour}
          stroke={'white'}
        />
        <rect
          x={bOnlyStart}
          y={0}
          width={bOnlyWidth}
          height={HEIGHT}
          fill={theme.palette.secondary.main}
          stroke={'white'}
        />
      </g>

      <g>
        <rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill={'none'}
          stroke={theme.palette.grey[700]}
        />
      </g>
    </svg>
  );
};

export default withTheme()(LinearVenn);
