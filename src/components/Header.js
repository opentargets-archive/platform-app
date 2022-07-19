import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(theme => ({
  externalLinks: {
    '& > :not(:first-child):before': {
      content: '" | "',
    },
  },
  mainIconContainer: {
    width: '56px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '4px',
    justifyContent: 'center',
  },
  mainIcon: {
    color: theme.palette.primary.main,
  },
  subtitle: {
    display: 'flex',
    paddingLeft: '5px',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
}));

function Header({
  loading,
  Icon,
  title,
  subtitle = null,
  externalLinks,
  rightContent = null,
  RMTLPopover = null,
}) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.titleContainer}
      container
      id="profile-page-header-block"
    >
      <Grid item zeroMinWidth>
        <Grid container wrap="nowrap">
          <Grid item className={classes.mainIconContainer}>
            <FontAwesomeIcon
              icon={Icon}
              size="3x"
              className={classes.mainIcon}
            />
          </Grid>
          <Grid item zeroMinWidth>
            <Grid container>
              <Typography
                className={classes.title}
                variant="h4"
                noWrap
                title={title}
              >
                {loading ? <Skeleton width="10vw" /> : title}
              </Typography>
              <Typography className={classes.subtitle} variant="subtitle2">
                {loading ? <Skeleton width="25vw" /> : subtitle}
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant="body2" className={classes.externalLinks}>
                {loading ? <Skeleton width="50vw" /> : externalLinks}
              </Typography>
            </Grid>
            <Grid container>
              {loading ? <Skeleton width="50vw" /> : RMTLPopover}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>{rightContent}</Grid>
    </Grid>
  );
}

export default Header;
