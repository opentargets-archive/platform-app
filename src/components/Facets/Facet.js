import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import { TreeView } from '@material-ui/lab';

import facetStyles from './facetStyles';
import TreeLevel from './TreeLevel';

function Facet({ treeId, label, aggs, onSelectionChange }) {
  const classes = facetStyles();

  const handleSelectionChange = newSelection => {
    onSelectionChange(newSelection);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{label}</Typography>
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
