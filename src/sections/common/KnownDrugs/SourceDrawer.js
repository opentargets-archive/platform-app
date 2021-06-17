import React, { useState } from 'react';
import {
  makeStyles,
  List,
  ListItem,
  Drawer,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Box,
  Paper,
  IconButton,
  Link as MUILink,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';

import Link from '../../../components/Link';

const sourceDrawerStyles = makeStyles(theme => ({
  drawerLink: {
    cursor: 'pointer',
  },
  drawerBody: {
    overflowY: 'overlay',
  },
  drawerModal: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
  },
  drawerPaper: {
    backgroundColor: theme.palette.grey[300],
  },
  drawerTitle: {
    borderBottom: '1px solid #ccc',
    padding: '1rem',
  },
  drawerTitleCaption: {
    color: theme.palette.grey[700],
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  AccordionExpanded: {
    margin: '1rem !important',
  },
  AccordionRoot: {
    border: '1px solid #ccc',
    margin: '1rem 1rem 0 1rem',
    padding: '1rem',
    '&::before': {
      backgroundColor: 'transparent',
    },
  },
  AccordionSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  AccordionTitle: {
    color: theme.palette.grey[700],
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  summaryBoxRoot: {
    marginRight: '2rem',
  },
}));

const tableSourceLabel = name =>
  ({
    ATC: 'ATC',
    ClinicalTrials: 'ClinicalTrials.gov',
    DailyMed: 'DailyMed',
    FDA: 'FDA',
  }[name]);

const drawerSourceLabel = (name, url) => {
  if (name === 'ClinicalTrials') {
    return url.split('%22')[1] || `${tableSourceLabel(name)} reference`;
  }
  if (name === 'DailyMed') {
    return url.split('setid=')[1] || `${tableSourceLabel(name)} reference`;
  }
  if (name === 'FDA') {
    return url.split('set_id:')[1] || `${tableSourceLabel(name)} reference`;
  }
  if (name === 'ATC') {
    return url.split('code=')[1] || `${tableSourceLabel(name)} reference`;
  }
  return `${url.name} entry`;
};

function SourceDrawer({ references }) {
  const [open, setOpen] = useState(false);
  const classes = sourceDrawerStyles();

  if (references.length === 0) {
    return 'N/A';
  }

  if (references.length === 1) {
    return (
      <Link external to={references[0].url}>
        {tableSourceLabel(references[0].name)}
      </Link>
    );
  }

  const groupedReferences = _.groupBy(references, 'name');

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const drawerContent = (
    <>
      <Paper classes={{ root: classes.drawerTitle }} elevation={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.drawerTitleCaption}>
            Records
          </Typography>
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>

      <Box className={classes.drawerBody}>
        {Object.keys(groupedReferences).map(group => (
          <Accordion
            elevation={0}
            key={group}
            classes={{
              root: classes.AccordionRoot,
              expanded: classes.AccordionExpanded,
            }}
            defaultExpanded={
              groupedReferences[group].length < 10 ||
              Object.keys(groupedReferences).length === 1
            }
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box classes={{ root: classes.summaryBoxRoot }}>
                <Typography className={classes.AccordionTitle}>
                  {tableSourceLabel(group)}
                </Typography>
                <Typography className={classes.AccordionSubtitle}>
                  {groupedReferences[group].length} references
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {groupedReferences[group].map((item, itemIndex) => (
                  <ListItem key={itemIndex}>
                    <Link external to={item.url}>
                      {drawerSourceLabel(item.name, item.url)}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );

  return (
    <>
      <MUILink onClick={toggleDrawer} className={classes.drawerLink}>
        {references.length} references
      </MUILink>

      <Drawer
        anchor="right"
        classes={{ modal: classes.drawerModal, paper: classes.drawerPaper }}
        open={open}
        onClose={closeDrawer}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default SourceDrawer;
