import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Tab, Tabs } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import Link from '../Link';
import RelevantIcon from './RelevantIcon';
import NonRelevantIcon from './NonRelevantIcon';
import UnspecifiedIcon from './UnspecifiedIcon';

const useStyles = makeStyles(theme => ({
  rmtlTitle: {
    color: '#3489CA',
  },
  rmtlIconBox: {
    'margin-top': '20px',
  },
  typography: {
    padding: theme.spacing(2),
    'padding-top': theme.spacing(0),
  },
  landpage: {
    margin: '0px',
    float: 'right',
    padding: theme.spacing(0),
    'padding-top': theme.spacing(2),
    'padding-right': theme.spacing(2),
  },
}));

function RMTLPopOver(style) {
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
  const defaultTab = 'RMTL';
  const [tab, setTab] = useState(defaultTab);

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  const RMTLlandingPageUrl = '/rmtl';

  return (
    <div style={{ display: 'inline' }}>
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
      <div
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="MuiGrid-root"
      >
        <div container="" justify="center" />
      </div>
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
        className={classes.popo}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Typography className={classes.landpage}>
              Search the RMTL within Open Targets{' '}
              <Link external to={RMTLlandingPageUrl}>
                here
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.typography}>
              <Tabs value={tab} onChange={handleChangeTab}>
                <Tab value="RMTL" icon={<RelevantIcon />} />
                <Tab value="NonRMTL" icon={<NonRelevantIcon />} />
                <Tab value="UnspecifyTarget" icon={<UnspecifiedIcon />} />
              </Tabs>
              {tab === 'RMTL' && (
                <i>
                  Molecular target for which existing evidence and/or biologic
                  rationale exist to determine <br />
                  potential relevance to the growth or progression of one or
                  more pediatric cancers.
                </i>
              )}
              {tab === 'NonRMTL' && (
                <i>
                  Molecular target for which there is evidence that it is not
                  associated with the growth or progression <br />
                  of pediatric tumors for which requirement for early pediatric
                  evaluation of drugs and biologics which <br />
                  are directed at this target would be waived.
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
