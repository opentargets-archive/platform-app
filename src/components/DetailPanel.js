import React from 'react';
import { Element } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const DetailPanel = ({ id, name, icon, hasData }) => (
  <Grid item xs={12} style={{ marginBottom: 8 }}>
    <Element name={id}>
      <Card style={{ minHeight: 200 }}>
        <CardHeader
          avatar={
            <Avatar>
              {name
                .split(' ')
                .map(d => d[0].toUpperCase())
                .join('')}
            </Avatar>
          }
          action={null}
          title={name}
        />
      </Card>
    </Element>
  </Grid>
);

export default DetailPanel;
