import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Tab, Tabs } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import Link from '../Link';
import RelevantIcon from './RelevantIcon';
import NonRelevantIcon from './NonRelevantIcon';
import UnspecifiedIcon from './UnspecifiedIcon';

function PMTLHelper(fdaDesignationValue) {
  let pmtlObj = {
    fdaDesignation: 'Unspecified Target',
    icon: <UnspecifiedIcon />,
    defaultTab: 'UnspecifyTarget',
  };

  if (fdaDesignationValue === 'Relevant Molecular Target') {
    pmtlObj = {
      fdaDesignation: 'Relevant Molecular Target',
      icon: <RelevantIcon />,
      defaultTab: 'RMT',
    };
  } else if (fdaDesignationValue === 'Non-Relevant Molecular Target') {
    pmtlObj = {
      fdaDesignation: 'Non-Relevant Molecular Target',
      icon: <NonRelevantIcon />,
      defaultTab: 'NonRMT',
    };
  }

  return pmtlObj;
}
function RMTLPopOver({ otherStyle, pmtl }) {
  const useStyles = makeStyles(theme => ({
    rmtlHeaderText: {
      display: 'inline',
      cursor: 'pointer',
      fontSize: '14px',
    },
    fdaDesignation: {
      color: '#3489CA',
    },
    iconContainer: {
      display: 'inline',
    },
    popover: {
      maxWidth: theme.spacing(110),
      fontSize: '14px',
    },
    tabContainer: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(0),
    },
    toLandingPageLinkBox: {
      display: 'inline',
      width: '100%',
    },
    toLandingPageLink: {
      marginTop: '20px',
      float: 'right',
    },
    typography: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
      fontSize: '14px',
    },
    ...otherStyle,
  }));

  const classes = useStyles();
  // icon will update depending if a Target is RMT, NonRMT or UnspecifyTarget
  const {fdaDesignation, defaultTab, icon: pmtlIcon} = PMTLHelper(pmtl)
  const [tab, setTab] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const PMTLlandingPageUrl = '/fda-pmtl';

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <div className={classes.RMTLContainer} style={{ display: 'inline' }}>
      <div onClick={handleClick} className={classes.rmtlHeaderText}>
        <span>FDA PMTL: </span>
        <span className={classes.fdaDesignation}>
          <b>{fdaDesignation}</b>
        </span>
        <div className={classes.iconContainer}> {pmtlIcon} </div>
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
        className={classes.popover}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Tabs
              value={tab || defaultTab}
              onChange={handleChangeTab}
              className={classes.tabContainer}
            >
              <Tab value="RMT" icon={<RelevantIcon />} />
              <Tab value="NonRMT" icon={<NonRelevantIcon />} />
              <Tab value="UnspecifyTarget" icon={<UnspecifiedIcon />} />
              <div className={classes.toLandingPageLinkBox}>
                <span className={classes.toLandingPageLink}>
                  Search the PMTL within Open Targets{' '}
                  <Link to={PMTLlandingPageUrl}>here</Link>
                </span>
              </div>
            </Tabs>
            <Typography className={classes.typography}>
              {(tab || defaultTab) === 'RMT' && (
                <>
                  Molecular target for which existing evidence and/or biologic
                  rationale exist to determine potential relevance to the growth
                  or progression of one or more pediatric cancers.
                </>
              )}
              {(tab || defaultTab) === 'NonRMT' && (
                <>
                  Molecular target for which there is evidence that it is not
                  associated with the growth or progression of pediatric tumors
                  for which requirement for early pediatric evaluation of drugs
                  and biologics which are directed at this target would be
                  waived.
                </>
              )}
              {(tab || defaultTab) === 'UnspecifyTarget' && (
                <>
                  {' '}
                  No guidance on whether this target is relevant for pediatric
                  cancer drug development.{' '}
                </>
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
