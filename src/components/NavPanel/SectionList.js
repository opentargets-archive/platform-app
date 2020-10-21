import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { List, makeStyles } from '@material-ui/core';

import SectionItem from './SectionItem';

const useStyles = makeStyles({ list: { paddingTop: '2.5rem' } });

const MemoizedList = React.memo(({ sectionList }) =>
  sectionList.map((section, index) => (
    <SectionItem key={section.id} index={index} {...section} />
  ))
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function SectionList({ sections, onSectionReorder, shouldRender }) {
  const classes = useStyles();

  const sectionList = sections.map(section => {
    const { id, name, shortName } = section.props.definition;

    return {
      id,
      name,
      shortName,
      hasData: shouldRender(section),
    };
  });

  const handleSectionDrop = result => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newSectionOrder = reorder(
      sectionList.map(section => section.id),
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
            className={classes.list}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <MemoizedList sectionList={sectionList} />
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SectionList;
