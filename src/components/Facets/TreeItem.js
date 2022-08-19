import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { TreeItem as MUITreeItem } from '@material-ui/lab';
import PartnerLockIcon from '../PartnerLockIcon';

const useStyles = makeStyles(theme => ({
  countLabel: {
    fontSize: '.7rem',
    fontWeight: 'bold',
    color: theme.palette.grey[500],
  },

  formControlLabelRoot: {
    minWidth: '85%',
  },
  FormControlLabelLabel: {
    fontSize: '.9rem',
    display: 'flex',
    maxWidth: '100%',
    paddingRight: '15%',
  },
  treeItemRoot: {
    '&:focus > $treeItemContent $treeItemLabel': {
      backgroundColor: 'transparent',
    },
    '&$treeItemSelected > $treeItemContent $treeItemLabel': {
      backgroundColor: 'transparent',
    },
    '&$treeItemSelected:focus > $treeItemContent $treeItemLabel': {
      backgroundColor: 'transparent',
    },
    '&$treeItemSelected > $treeItemContent $treeItemLabel:hover': {
      backgroundColor: 'transparent',
    },
  },

  treeItemContent: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  treeItemSelected: {},
  treeItemLabel: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '91%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  treeItemLabelText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  treeItemLabelIcon: {
    marginLeft: '0.5em',
  },
}));

function TreeItem({
  loading,
  nodeId,
  label,
  count,
  checked,
  indeterminate,
  onClick,
  isPrivate,
  ...other
}) {
  const classes = useStyles();

  const handleClick = event => {
    event.preventDefault();
    if (!loading && count) onClick([nodeId]);
  };

  return (
    <MUITreeItem
      classes={{
        root: classes.treeItemRoot,
        content: classes.treeItemContent,
        label: classes.treeItemLabel,
        selected: classes.treeItemSelected,
      }}
      label={
        <>
          <FormControlLabel
            classes={{
              root: classes.formControlLabelRoot,
              label: classes.FormControlLabelLabel,
            }}
            control={
              <Checkbox
                disabled={loading || !count}
                color="primary"
                checked={checked}
                indeterminate={indeterminate}
              />
            }
            label={
              <>
                <span title={label} className={classes.treeItemLabelText}>
                  {label}
                </span>
                {isPrivate && (
                  <span className={classes.treeItemLabelIcon}>
                    <PartnerLockIcon />
                  </span>
                )}
              </>
            }
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
