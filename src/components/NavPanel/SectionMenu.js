import React from 'react';
import classNames from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { List } from '@material-ui/core';

import navPanelStyles from './navPanelStyles';
import SectionMenuItem from './SectionMenuItem';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
};

function SectionMenu({ sections, onSectionReorder }) {
  const classes = navPanelStyles();

  const handleSectionDrop = result => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newSectionOrder = reorder(
      sections.map(section => section.props.definition.id),
      result.source.index,
      result.destination.index
    );

    onSectionReorder(newSectionOrder);
  };

  return (
    <DragDropContext onDragEnd={handleSectionDrop}>
      <Droppable droppableId="section-list-droppable">
        {provided => (
          <List
            className={classNames(classes.list, classes.listOverflowClass)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sections.map((section, index) => (
              <SectionMenuItem
                key={section.props.definition.id}
                index={index}
                section={section}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SectionMenu;
