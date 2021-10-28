import React from 'react';
import classNames from 'classnames';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { Element } from 'react-scroll';

import ErrorBoundary from '../ErrorBoundary';
import Chip from '../Chip';
import SectionError from './SectionError';
import sectionStyles from './sectionStyles';
import { createShortName } from '../Summary/utils';

function SectionItem({
  definition,
  request,
  renderDescription,
  renderBody,
  tags,
  chipText,
  avatarStyle,
}) {
  const classes = sectionStyles();
  const { loading, error, data } = request;
  const shortName = createShortName(definition);

  return (
    <Grid item xs={12}>
      <Element name={definition.id}>
        <Card elevation={0}>
          <ErrorBoundary>
            <CardHeader
              classes={{
                root: classes.cardHeader,
                action: classes.cardHeaderAction,
              }}
              avatar={
                <Avatar
                  className={classNames(classes.avatar, classes.avatarHasData, avatarStyle, {
                    [classes.avatarError]: error,
                  })}
                >
                  {shortName}
                </Avatar>
              }
              title={
                <Grid container justify="space-between">
                  <Typography
                    className={classNames(classes.title, classes.titleHasData, {
                      [classes.titleError]: error,
                    })}
                  >
                    {definition.name}
                  </Typography>
                  {chipText ? (
                    <Chip label={chipText} className={classes.chip} />
                  ) : null}
                </Grid>
              }
              subheader={
                <Typography
                  className={classNames(
                    classes.description,
                    classes.descriptionHasData,
                    {
                      [classes.descriptionError]: error,
                    }
                  )}
                >
                  {renderDescription()}
                </Typography>
              }
              action={tags}
            />
            {loading ? (
              <LinearProgress />
            ) : (
              <Box className={classes.loadingPlaceholder} />
            )}
            {error && <SectionError error={error} />}
            {!loading && data && (
              <CardContent className={classes.cardContent}>
                {renderBody(data)}
              </CardContent>
            )}
          </ErrorBoundary>
        </Card>
      </Element>
    </Grid>
  );
}

export default SectionItem;
