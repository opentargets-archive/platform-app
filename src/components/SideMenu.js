import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';

import SideMenuItem from './SideMenuItem';

const defaultOrder = [
  {
    id: 'drugs',
  },
  {
    id: 'chemicalProbes',
  },
  {
    id: 'relatedTargets',
  },
  {
    id: 'pathways',
  },
  {
    id: 'protein',
  },
  {
    id: 'cancerBiomarkers',
  },
  {
    id: 'geneOntology',
  },
  {
    id: 'proteinInteractions',
  },
  {
    id: 'rnaAndProteinExpression',
  },
  {
    id: 'mousePhenotypes',
  },
  {
    id: 'tractability',
  },
  {
    id: 'cancerHallmarks',
  },
  {
    id: 'variation',
  },
  {
    id: 'homology',
  },
  // { id: 'bibliography' },
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // // some basic styles to make the items look a bit nicer
  // userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // // change background colour if dragging
  background: isDragging ? '#bbb' : 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#ddd' : 'none',
  // padding: grid,
  // width: 250,
});

const portal = document.createElement('div');
portal.classList.add('my-super-cool-portal');

if (!document.body) {
  throw new Error('body not ready for portal creation!');
}

document.body.appendChild(portal);

class PortalAwareItem extends React.Component {
  render() {
    const provided = this.props.provided;
    const snapshot = this.props.snapshot;
    const item = this.props.item;
    const onClick = this.props.onClick;

    const usePortal = snapshot.isDragging;

    const child = (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <SideMenuItem {...item} inPortal={usePortal} onClick={onClick} />
      </div>
    );

    if (!usePortal) {
      return child;
    }

    // if dragging - put the item in a portal
    return ReactDOM.createPortal(child, portal);
  }
}

class SideMenu extends React.PureComponent {
  state = { order: defaultOrder };
  static getDerivedStateFromProps(props, state) {
    const { data } = props;
    const { order } = state;
    const orderedData = order.map(d => data.find(e => e.id === d.id));
    return { orderedData };
  }
  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }

    const order = reorder(
      this.state.order,
      result.source.index,
      result.destination.index
    );

    this.setState({
      order,
    });
  };
  render() {
    const { style, onSideMenuItemClick } = this.props;
    const { orderedData } = this.state;
    return (
      <Card style={{ ...style, overflow: 'auto' }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppableSections">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {orderedData.map((d, index) => (
                  <Draggable key={d.id} draggableId={d.id} index={index}>
                    {(provided, snapshot) => (
                      <PortalAwareItem
                        {...{
                          provided,
                          snapshot,
                          item: d,
                          onClick: () => onSideMenuItemClick(d.id),
                        }}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    );
  }
}

export default SideMenu;
