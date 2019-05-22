import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import DetailPanel from './DetailPanel';
import SideMenu from './SideMenu';

const DetailPanelsContainer = ({ data }) => (
  <div style={{ paddingTop: 8, paddingBottom: 8 }}>
    <Grid container spacing={8}>
      <Hidden smDown>
        <Grid item md={2}>
          <StickyContainer style={{ height: '100%' }}>
            <Sticky>
              {({ style }) => <SideMenu style={style} data={data} />}
            </Sticky>
          </StickyContainer>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={10}>
        {data.map(d => (
          <DetailPanel key={d.id} {...d} />
        ))}
      </Grid>
    </Grid>
  </div>
);

export default DetailPanelsContainer;
