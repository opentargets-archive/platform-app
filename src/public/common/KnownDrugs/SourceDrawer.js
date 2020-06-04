import React, { useState } from 'react';
import {
  makeStyles,
  Chip,
  List,
  ListItem,
  Drawer,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Box,
  Paper,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';

import { Link, Typography } from 'ot-ui';

const sourceDrawerStyles = makeStyles(theme => ({
  chipRoot: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: 0,
    margin: '0 .5rem',
    width: '90%',
  },
  drawerModal: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
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
  drawerPaper: {
    backgroundColor: theme.palette.grey[300],
  },
  expansionPanelRoot: {
    border: '1px solid #ccc',
    margin: '1rem 1rem 0 1rem',
    padding: '1rem',
    '&::before': {
      backgroundColor: 'transparent',
    },
  },
  expansionPanelTitle: {
    color: theme.palette.grey[700],
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  expansionPanelSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  expansionPanelExpanded: {
    margin: '1rem !important',
  },
  summaryBoxRoot: {
    marginRight: '2rem',
  },
}));

const sourceLabel = (name, url) => {
  if (name === 'Clinical Trials Information') {
    return url.split('%22')[1] || `${name} entry`;
  }
  if (name === 'DailyMed Information') {
    return url.split('setid=')[1] || `${name} entry`;
  }
  if (name === 'FDA Information') {
    return url.split('set_id:')[1] || `${name} entry`;
  }

  return `${url.name} entry`;
};

function SourceDrawer({ caption, items }) {
  const [open, setOpen] = useState(false);
  const groupedItems = _.groupBy(items, 'name');
  const classes = sourceDrawerStyles();

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

      {Object.keys(groupedItems).map(group => (
        <ExpansionPanel
          elevation={0}
          key={group}
          classes={{
            root: classes.expansionPanelRoot,
            expanded: classes.expansionPanelExpanded,
          }}
          defaultExpanded={
            groupedItems[group].length < 10 ||
            Object.keys(groupedItems).length === 1
          }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Box classes={{ root: classes.summaryBoxRoot }}>
              <Typography className={classes.expansionPanelTitle}>
                {group}
              </Typography>
              <Typography className={classes.expansionPanelSubtitle}>
                {groupedItems[group].length} items
              </Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {groupedItems[group].map((item, itemIndex) => (
                <ListItem key={itemIndex}>
                  <Link external to={item.url}>
                    {sourceLabel(item.name, item.url)}
                  </Link>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  );

  return (
    <>
      <Chip
        variant="outlined"
        size="small"
        label={caption}
        classes={{ root: classes.chipRoot }}
        onClick={toggleDrawer}
      />

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
