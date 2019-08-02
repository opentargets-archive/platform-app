import React from 'react';

import { significantFigures } from 'ot-ui';

const HeatmapCell = ({ value, colorScale, onClick, selected }) => {
  const a = 'white';
  const b = '#E0E0E0';
  const c = 'red';
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block',
        width: '16px',
        height: '16px',
        border: `${selected ? 2 : 1}px solid ${selected ? c : b}`,
        background:
          value > 0
            ? colorScale(value)
            : `repeating-linear-gradient(45deg,${a},${a} 2px,${b} 2px,${b} 4px)`,
      }}
      title={`Score: ${value > 0 ? significantFigures(value) : 'N/A'}`}
    />
  );
};

export default HeatmapCell;
