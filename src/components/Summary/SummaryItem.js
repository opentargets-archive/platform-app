import React from 'react';
import classNames from 'classnames';
import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { scroller } from 'react-scroll';

import summaryStyles from './summaryStyles';
import { createShortName } from './utils';

function SummaryItem({ definition, request, renderSummary, subText }) {
  const classes = summaryStyles();
  const { loading, error, data } = request;
  const shortName = createShortName(definition);
  const hasData = !loading && !error && data && definition.hasData(data);

  const handleClickSection = () => {
    scroller.scrollTo(definition.id, {
      duration: 500,
      delay: 100,
      smooth: true,
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        className={classNames(classes.card, {
          [classes.cardHasData]: hasData,
          [classes.cardError]: error,
        })}
        onClick={handleClickSection}
        elevation={0}
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              className={classNames(classes.avatar, {
                [classes.avatarHasData]: hasData,
                [classes.avatarError]: error,
              })}
            >
              {shortName}
            </Avatar>
          }
          title={
            <>
              <Typography
                className={classNames(classes.title, {
                  [classes.titleHasData]: hasData,
                  [classes.titleError]: error,
                })}
                variant="body2"
              >
                {definition.name}
              </Typography>
              {subText ? (
                <Typography
                  className={classNames(classes.subtitle, {
                    [classes.subtitleHasData]: hasData,
                  })}
                  variant="caption"
                >
                  {subText}
                </Typography>
              ) : null}
            </>
          }
        />
        {loading && <LinearProgress />}
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Grid item>
            <Typography
              align="center"
              className={classNames(classes.subheader, {
                [classes.subheaderHasData]: hasData,
                [classes.subheaderError]: error,
              })}
            >
              {error && 'An error occurred while loading this section'}
              {loading && 'Loading...'}
              {!loading && data && !hasData && 'no data'}
              {!loading && data && hasData && renderSummary(data)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default SummaryItem;
