import React from 'react';
import classNames from 'classnames';
import { Element } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import SectionAvatar from './SectionAvatar';
import SectionPanelLoader from './SectionPanelLoader';
import TargetSummaryContext from '../../contexts/TargetSummaryContext';

const styles = theme => ({
  title: {
    color: theme.palette.grey[400],
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  titleHasData: {
    color: theme.palette.grey[700],
  },
  titleError: {
    color: theme.palette.secondary.main,
  },
  description: {
    fontStyle: 'italic',
    fontSize: '0.8rem',
    color: theme.palette.grey[400],
  },
  descriptionHasData: {
    color: theme.palette.grey[700],
  },
  descriptionError: {
    color: theme.palette.secondary.main,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  cardContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
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
      error,
      loading,
      renderDescription,
      query,
      SectionComponent,
    } = this.props;
    return (
      <Grid item xs={12} style={{ marginBottom: 8 }}>
        <Element name={id}>
          <Card elevation={0}>
            <CardHeader
              className={classes.cardHeader}
              avatar={<SectionAvatar {...{ name, icon, hasData, error }} />}
              action={null}
              title={
                <Typography
                  className={classNames({
                    [classes.title]: true,
                    [classes.titleHasData]: hasData,
                    [classes.titleError]: error,
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
                    [classes.descriptionError]: error,
                  })}
                >
                  {renderDescription ? renderDescription(this.context) : null}
                </Typography>
              }
            />
            {loading ? <LinearProgress /> : null}
            <CardContent className={classes.cardContent}>
              <SectionPanelLoader
                {...{
                  sectionId: id,
                  hasData,
                  error,
                  loading,
                  query,
                  SectionComponent,
                }}
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
