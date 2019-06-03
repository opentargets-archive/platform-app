import React from 'react';
import classNames from 'classnames';
import { Element } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import SectionAvatar from './SectionAvatar';
import DetailPanelLoader from './DetailPanelLoader';
import TargetSummaryContext from '../contexts/TargetSummaryContext';

const styles = theme => ({
  avatar: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#eee',
  },
  title: {
    color: theme.palette.grey[400],
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  titleHasData: {
    color: theme.palette.grey[700],
  },
  description: {
    fontStyle: 'italic',
    fontSize: '0.8rem',
    color: theme.palette.grey[400],
  },
  descriptionHasData: {
    color: theme.palette.grey[700],
  },
});

class DetailPanel extends React.Component {
  render() {
    const {
      classes,
      id,
      name,
      icon,
      hasData,
      renderDescription,
      query,
      SectionComponent,
    } = this.props;
    return (
      <Grid item xs={12} style={{ marginBottom: 8 }}>
        <Element name={id}>
          <Card elevation={0}>
            <CardHeader
              avatar={<SectionAvatar {...{ name, icon, hasData }} />}
              action={null}
              title={
                <Typography
                  className={classNames({
                    [classes.title]: true,
                    [classes.titleHasData]: hasData,
                  })}
                >
                  {name}
                </Typography>
              }
              subheader={
                <Typography
                  className={classNames({
                    [classes.description]: true,
                    [classes.descriptionHasData]: hasData,
                  })}
                >
                  {renderDescription ? renderDescription(this.context) : null}
                </Typography>
              }
            />
            <CardContent>
              <DetailPanelLoader
                {...{ sectionId: id, hasData, query, SectionComponent }}
              />
            </CardContent>
          </Card>
        </Element>
      </Grid>
    );
  }
}
DetailPanel.contextType = TargetSummaryContext;

export default withStyles(styles)(DetailPanel);
