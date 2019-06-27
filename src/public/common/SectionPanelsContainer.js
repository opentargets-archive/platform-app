import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import SectionPanel from './SectionPanel';
import SideMenu from '../common/SideMenu';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class SectionPanelsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.defaultSectionsOrder,
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { data } = props;
    const { order } = state;
    const orderedData = order.map(d => data.find(e => e.id === d));
    return { orderedData };
  }
  onSideMenuItemDrag = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }

    // new order
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
    const {
      onSideMenuItemClick,
      onScrollToTopClick,
      entity,
      entitySectionsAccessor,
    } = this.props;
    const { orderedData } = this.state;
    return (
      <div style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Grid container spacing={8}>
          <Hidden smDown>
            <Grid item md={2}>
              <StickyContainer style={{ height: '100%' }}>
                <Sticky>
                  {({ style, isSticky }) =>
                    isSticky ? (
                      <SideMenu
                        style={{ ...style, marginTop: isSticky ? 120 : 0 }}
                        data={orderedData}
                        onSideMenuItemClick={onSideMenuItemClick}
                        onSideMenuItemDrag={this.onSideMenuItemDrag}
                        onScrollToTopClick={onScrollToTopClick}
                      />
                    ) : (
                      <div />
                    )
                  }
                </Sticky>
              </StickyContainer>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={10}>
            {orderedData
              .filter(d => d.loading || d.hasData)
              .map(d => (
                <SectionPanel
                  key={d.id}
                  {...d}
                  entity={entity}
                  entitySectionsAccessor={entitySectionsAccessor}
                />
              ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SectionPanelsContainer;
