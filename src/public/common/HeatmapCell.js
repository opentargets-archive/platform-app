import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import { significantFigures } from 'ot-ui';

const styles = theme => ({
  cell: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: `1px solid ${theme.palette.grey[300]}`,
    background: `repeating-linear-gradient(45deg,white,white 2px,${
      theme.palette.grey[300]
    } 2px,${theme.palette.grey[300]} 4px)`,
  },
  cellSelected: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
});

const HeatmapCell = ({ classes, value, colorScale, onClick, selected }) => {
  const styles =
    value > 0
      ? {
          background: colorScale(value),
        }
      : null;
  return (
    <span
      onClick={onClick}
      className={classNames(classes.cell, {
        [classes.cellSelected]: selected,
      })}
      style={styles}
      title={`Score: ${value > 0 ? significantFigures(value) : 'N/A'}`}
    />
  );
};

export default withStyles(styles)(HeatmapCell);
