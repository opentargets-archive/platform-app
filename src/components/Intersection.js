import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { PALETTE } from 'ot-ui';

const PADDING = 3;
const RADIUS = 48;
const OFFSET = 10;

const styles = () => {
  return {
    svg: {
      display: 'block',
      marginBottom: '8px',
    },
  };
};

const Intersection = ({ classes, id, a, ab, b }) => {
  return (
    <svg
      className={classes.svg}
      width={2.8 * RADIUS + 6}
      height={2 * RADIUS + 6}
    >
      <defs>
        <clipPath id={id}>
          <circle
            r={RADIUS}
            cx={1.8 * RADIUS + PADDING}
            cy={RADIUS + PADDING}
          />
        </clipPath>
      </defs>
      <circle
        r={RADIUS}
        cx={RADIUS + PADDING}
        cy={RADIUS + PADDING}
        fill={PALETTE.purple}
        clipPath={`url(#${id})`}
      />
      <circle
        r={RADIUS}
        cx={RADIUS + PADDING}
        cy={RADIUS + PADDING}
        stroke={PALETTE.darkblue}
        strokeWidth="3"
        fill="none"
      />
      <circle
        r={RADIUS}
        cx={1.8 * RADIUS + PADDING}
        cy={RADIUS + PADDING}
        stroke={PALETTE.darkblue}
        strokeWidth="3"
        fill="none"
      />
      <text
        x="26"
        y={RADIUS + OFFSET}
        textAnchor="middle"
        fill={PALETTE.darkgrey}
      >
        {a}
      </text>
      <text x="70" y={RADIUS + OFFSET} textAnchor="middle" fill="white">
        {ab}
      </text>
      <text
        x="115"
        y={RADIUS + OFFSET}
        textAnchor="middle"
        fill={PALETTE.darkgrey}
      >
        {b}
      </text>
    </svg>
  );
};

export default withStyles(styles)(Intersection);
