import React from 'react';
import { Box, Chip, makeStyles, Tooltip } from '@material-ui/core';

import { naLabel } from '../constants';
import classNames from 'classnames';

const useContainerStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}));

const useChipStyles = makeStyles({
  chip: { margin: '3px 5px 3px 0' },
});

function ChipContainer({ item, children }) {
  const classes = useContainerStyles();

  return item.tooltip ? (
    <Tooltip
      placement="top"
      interactive
      classes={{ tooltip: classes.tooltip }}
      title={item.tooltip}
    >
      {children}
    </Tooltip>
  ) : (
    children
  );
}

/**
 * Display a (horizontal) list of "chips".
 * Each chip can show an optional tooltip.
 * @param items Array of Strings.
 * @param small Display each chip as size="small"
 * Each item in the items array can also be an object, with format {label, tooltip, customClass}
 */
function ChipList({ items, small }) {
  const classes = useChipStyles();

  if (!items || items.length === 0) return naLabel;

  return items.map((item, index) => (
    <ChipContainer key={index} item={item}>
      <Chip
        component={!!item.url ? 'a' : Box}
        href={item.url}
        className={classNames(classes.chip, item.customClass)}
        clickable={!!item.url}
        target="_blank"
        noopener="true"
        noreferrer="true"
        color="primary"
        label={item.label}
        size={small ? 'small' : 'medium'}
      />
    </ChipContainer>
  ));
}

export default ChipList;
