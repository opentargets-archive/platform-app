import React from 'react';
import { Avatar, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { scroller } from 'react-scroll';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
  listItem: {
    height: '3.33rem',
    padding: '0 .66rem',
  },
  listItemAvatar: {
    backgroundColor: theme.palette.grey[300],
    marginRight: '1rem',
  },
  listItemAvatarHasData: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemLabel: {
    width: '10.1rem',
    whiteSpace: 'normal',
  },
  listItemText: {
    margin: 0,
  },
}));

function SectionItem({ index, id, name, shortName, hasData }) {
  const classes = useStyles();

  const handleSectionButtonClick = sectionId => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleSectionButtonClick(id)}
          >
            <Avatar
              className={classNames({
                [classes.listItemAvatar]: true,
                [classes.listItemAvatarHasData]: hasData,
              })}
            >
              {shortName}
            </Avatar>
            <ListItemText
              className={classes.listItemText}
              primary={name}
              primaryTypographyProps={{
                className: classes.listItemLabel,
              }}
            />
          </ListItem>
        </div>
      )}
    </Draggable>
  );
}

export default SectionItem;
