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
      classes={{ label: classes.treeItemLabel }}
      label={
        <>
          <FormControlLabel
            classes={{
              root: classes.formControlLabelRoot,
              label: classes.FormControlLabelLabel,
            }}
            control={
              <Checkbox
                disabled={!count}
                color="primary"
                checked={checked}
                indeterminate={indeterminate}
              />
            }
            label={<span title={label}>{label}</span>}
          />
          <Typography className={classes.countLabel}>{count}</Typography>
        </>
      }
      nodeId={nodeId}
      onLabelClick={handleClick}
      {...other}
    />
  );
}

export default TreeItem;
