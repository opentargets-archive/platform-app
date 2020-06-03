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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';

import { Link, Typography } from 'ot-ui';

const sourceDrawerStyles = makeStyles(theme => ({
  chipRoot: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: 0,
    margin: '0 .5rem',
    width: '100%',
  },
  drawerModal: {
    '& .MuiBackdrop-root': {
      opacity: '0 !important',
    },
  },
  drawerPaper: {
    backgroundColor: theme.palette.grey[300],
  },
  expansionPanelRoot: {
    margin: '1rem',
    padding: '1rem',
  },
  expansionPanelExpanded: {
    margin: '1rem !important',
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

  const groupedItems = _.groupBy(items, 'name');

  const classes = sourceDrawerStyles();

  const drawerContent = Object.keys(groupedItems).map(group => (
    <ExpansionPanel
      key={group}
      classes={{
        root: classes.expansionPanelRoot,
        expanded: classes.expansionPanelExpanded,
      }}
      defaultExpanded
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{group}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List classes={{ root: classes.tooltipListRoot }}>
          {groupedItems[group].map((item, i) => (
            <ListItem key={i} classes={{ root: classes.tooltipListItemRoot }}>
              <Link external to={item.url}>
                {sourceLabel(item.name, item.url)}
              </Link>
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));

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
