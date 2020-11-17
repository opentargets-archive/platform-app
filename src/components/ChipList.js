import React from 'react';
import { Box, Chip, makeStyles, Tooltip } from '@material-ui/core';

import { naLabel } from '../constants';

const useStyles = makeStyles(theme => ({
  chip: { margin: '3px 5px 3px 0' },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}));

function ChipList({ items }) {
  const classes = useStyles();

  if (!items || items.length === 0) return naLabel;

  return items.map((item, index) => {
    const ContainerComponent = item.tooltip
      ? ({ children }) => (
          <Tooltip
            placement="top"
            interactive
            classes={{ tooltip: classes.tooltip }}
            title={item.tooltip}
          >
            {children}
          </Tooltip>
        )
      : ({ children }) => <>{children}</>;

    return (
      <ContainerComponent key={index}>
        <Chip
          component={!!item.url ? 'a' : Box}
          href={item.url}
          className={classes.chip}
          clickable={!!item.url}
          target="_blank"
          noopener="true"
          noreferrer="true"
          color="primary"
          label={item.label}
        />
      </ContainerComponent>
    );
  });
}

export default ChipList;
