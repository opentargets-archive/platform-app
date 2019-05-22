import React from 'react';
import { Element } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import SectionAvatar from './SectionAvatar';
import TargetSummaryContext from '../contexts/TargetSummaryContext';

class DetailPanel extends React.Component {
  render() {
    const { id, name, icon, hasData, renderDescription } = this.props;
    return (
      <Grid item xs={12} style={{ marginBottom: 8 }}>
        <Element name={id}>
          <Card style={{ minHeight: 200 }}>
            <CardHeader
              avatar={<SectionAvatar {...{ name, icon, hasData }} />}
              action={null}
              title={name}
              subheader={
                renderDescription ? renderDescription(this.context) : null
              }
            />
          </Card>
        </Element>
      </Grid>
    );
  }
}
DetailPanel.contextType = TargetSummaryContext;

export default DetailPanel;
