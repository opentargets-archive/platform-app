import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import SideMenuItem from './SideMenuItem';

// Note: portalling seems to be necessary because of the sticky behaviour
//       (see https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/portal/portal-app.jsx)

const portal = document.createElement('div');
portal.classList.add('drag-n-drop-portal');
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
        <SideMenuItem {...item} inDragState={usePortal} onClick={onClick} />
      </div>
    );

    if (!usePortal) {
      return child;
    }

    // if dragging - put the item in a portal
    return ReactDOM.createPortal(child, portal);
  }
}

const styles = theme => ({
  scrollToTop: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: '8px',
    cursor: 'pointer',
  },
});

class SideMenu extends React.PureComponent {
  render() {
    const {
      classes,
      data,
      style,
      onSideMenuItemClick,
      onSideMenuItemDrag,
      onScrollToTopClick,
    } = this.props;
    return (
      <Card style={{ ...style, overflow: 'auto' }}>
        <DragDropContext onDragEnd={onSideMenuItemDrag}>
          <Droppable droppableId="droppableSections">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((d, index) => (
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
        <div className={classes.scrollToTop} onClick={onScrollToTopClick}>
          <Typography color="primary" align="center">
            back to top
          </Typography>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(SideMenu);
