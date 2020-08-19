import React from 'react';
import classNames from 'classnames';
import { Element } from 'react-scroll';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  LinearProgress,
  withStyles,
} from '@material-ui/core';

import SectionAvatar from './SectionAvatar';
import SectionPanelLoader from './SectionPanelLoader';
import ErrorBoundary from '../ErrorBoundary';

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

class SectionPanel extends React.Component {
  render() {
    const {
      classes,
      id,
      name,
      shortName,
      icon,
      entity,
      entitySectionsAccessor,
      getDetailFromDetails,
      hasData,
      error,
      loading,
      DescriptionComponent,
      sectionQuery,
      SectionComponent,
    } = this.props;
    return (
      <Grid item xs={12} style={{ marginBottom: 8 }}>
        <Element name={id}>
          <Card elevation={0}>
            <ErrorBoundary>
              <CardHeader
                className={classes.cardHeader}
                avatar={
                  <SectionAvatar
                    {...{ name, shortName, icon, hasData, error }}
                  />
                }
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
                    {DescriptionComponent ? (
                      <DescriptionComponent {...entity} />
                    ) : null}
                  </Typography>
                }
              />
              {loading ? <LinearProgress /> : null}
              <CardContent className={classes.cardContent}>
                <SectionPanelLoader
                  {...{
                    entity,
                    entitySectionsAccessor,
                    getDetailFromDetails,
                    sectionId: id,
                    hasData,
                    error,
                    loading,
                    sectionQuery,
                    SectionComponent,
                  }}
                />
              </CardContent>
            </ErrorBoundary>
          </Card>
        </Element>
      </Grid>
    );
  }
}

export default withStyles(styles)(SectionPanel);
