import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import SectionAvatar from './SectionAvatar';

const MiniWidget = ({ name, icon, hasData, onClick }) => (
  <Grid item xs={4} md={3} lg={2}>
    <Card style={{ height: '100%' }} onClick={onClick}>
      <CardHeader
        avatar={<SectionAvatar {...{ name, icon, hasData }} />}
        action={null}
        title={name}
      />
    </Card>
  </Grid>
);

export default MiniWidget;
