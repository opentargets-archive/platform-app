import React from 'react';
import { Element } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';

import SectionAvatar from './SectionAvatar';
import TargetSummaryContext from '../contexts/TargetSummaryContext';

const styles = theme => ({
  avatar: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  subheader: {
    fontStyle: 'italic',
    fontSize: '0.8rem',
  },
});

class DetailPanel extends React.Component {
  render() {
    const { classes, id, name, icon, hasData, renderDescription } = this.props;
    return (
      <Grid item xs={12} style={{ marginBottom: 8 }}>
        <Element name={id}>
          <Card style={{ minHeight: 200 }}>
            <CardHeader
              classes={{ title: classes.title, subheader: classes.subheader }}
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

export default withStyles(styles)(DetailPanel);
