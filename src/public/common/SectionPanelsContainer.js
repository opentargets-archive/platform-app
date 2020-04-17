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
  onSideMenuItemDrag = (result) => {
    const { data, onSectionOrderChange } = this.props;
    const currentOrder = data.map((d) => d.id);

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }

    // new order
    const newOrder = reorder(
      currentOrder,
      result.source.index,
      result.destination.index
    );

    onSectionOrderChange(newOrder);
  };
  render() {
    const {
      data,
      onSideMenuItemClick,
      onScrollToTopClick,
      entity,
      entitySectionsAccessor,
    } = this.props;
    return (
      <div style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Grid container spacing={1}>
          <Hidden smDown>
            <Grid item md={2}>
              <StickyContainer style={{ height: '100%' }}>
                <Sticky>
                  {({ style, isSticky }) =>
                    isSticky ? (
                      <SideMenu
                        style={{ ...style, marginTop: isSticky ? 120 : 0 }}
                        data={data}
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
            {data
              .filter((d) => d.loading || d.hasData)
              .map((d) => (
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
