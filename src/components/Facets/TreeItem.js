import React from 'react';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { TreeItem as MUITreeItem } from '@material-ui/lab';

import facetStyles from './facetStyles';

function TreeItem({
  nodeId,
  label,
  count,
  checked,
  indeterminate,
  onClick,
  ...other
}) {
  const classes = facetStyles();

  const handleClick = event => {
    event.preventDefault();
    onClick([nodeId]);
  };

  return (
    <MUITreeItem
      label={
        <div className={classes.treeItemLabelRoot}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={checked}
                indeterminate={indeterminate}
              />
            }
            label={
              <Typography className={classes.treeItemLabelText}>
                {label}
              </Typography>
            }
          />
          <Typography variant="caption">{count}</Typography>
        </div>
      }
      nodeId={nodeId}
      onLabelClick={handleClick}
      {...other}
    />
  );
}

export default TreeItem;
