import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ChevronRight, Clear, ExpandMore } from '@material-ui/icons';
import { TreeView } from '@material-ui/lab';

import facetStyles from './facetStyles';
import { hasAnyDescendantChecked } from './utils';
import TreeLevel from './TreeLevel';

function Facet({ treeId, label, aggs, onSelectionChange }) {
  const classes = facetStyles();

  const handleSelectionChange = newSelection => {
    onSelectionChange(newSelection);
  };

  const handleClickClear = event => {
    event.stopPropagation();
    onSelectionChange([treeId], false);
  };

  return (
    <Accordion>
      <AccordionSummary
        classes={{ content: classes.accordionSummaryContent }}
        expandIcon={<ExpandMore />}
      >
        <Typography>{label}</Typography>
        {hasAnyDescendantChecked(aggs) && (
          <IconButton
            className={classes.clearButtonRoot}
            onClick={handleClickClear}
          >
            <Clear />
          </IconButton>
        )}
      </AccordionSummary>

      <AccordionDetails>
        <TreeView
          className={classes.facetRoot}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
          <TreeLevel
            levelId={treeId}
            aggs={aggs}
            onSelectionChange={handleSelectionChange}
          />
        </TreeView>
      </AccordionDetails>
    </Accordion>
  );
}

export default Facet;
