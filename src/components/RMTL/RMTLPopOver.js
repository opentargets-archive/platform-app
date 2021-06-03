import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Tab, Tabs } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import Link from '../Link';
import RelevantIcon from './RelevantIcon';
import NonRelevantIcon from './NonRelevantIcon';
import UnspecifiedIcon from './UnspecifiedIcon';

function RMTLPopOver({ otherStyle }) {
  const useStyles = makeStyles(theme => ({
    rmtlTitle: {
      color: '#3489CA',
    },
    tabContainer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    typography: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    popover: {
      maxWidth: theme.spacing(110),
    },
    landPage: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      float: 'right',
    },
    ...otherStyle,
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Tab
  const defaultTab = 'RMT';
  const [tab, setTab] = useState(defaultTab);

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  const RMTLlandingPageUrl = '/rmtl';

  return (
    <div className={classes.RMTLContainer} style={{ display: 'inline' }}>
      <Typography
        variant="body2"
        onClick={handleClick}
        style={{ display: 'inline' }}
      >
        <span className={classes.rmtl}>FDA RMTL:</span>
        <span className={classes.rmtlTitle}>
          {' '}
          <b>Relevant Molecular Target </b>
        </span>
        <RelevantIcon />
      </Typography>{' '}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.popover}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Typography className={classes.landPage}>
              Search the RMTL within Open Targets{' '}
              <Link external to={RMTLlandingPageUrl}>
                here
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              className={classes.tabContainer}
            >
              <Tab value="RMT" icon={<RelevantIcon />} />
              <Tab value="NonRMT" icon={<NonRelevantIcon />} />
              <Tab value="UnspecifyTarget" icon={<UnspecifiedIcon />} />
            </Tabs>
            <Typography className={classes.typography}>
              {tab === 'RMT' && (
                <i>
                  Molecular target for which existing evidence and/or biologic
                  rationale exist to determine potential relevance to the growth
                  or progression of one or more pediatric cancers.
                </i>
              )}
              {tab === 'NonRMT' && (
                <i>
                  Molecular target for which there is evidence that it is not
                  associated with the growth or progression of pediatric tumors
                  for which requirement for early pediatric evaluation of drugs
                  and biologics which are directed at this target would be
                  waived.
                </i>
              )}
              {tab === 'UnspecifyTarget' && (
                <i>
                  {' '}
                  No guidance on whether this target is relevant for pediatric
                  cancer drug development.{' '}
                </i>
              )}{' '}
              Source:{' '}
              <Link
                external
                to="https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target"
              >
                FDA
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}

export default RMTLPopOver;
