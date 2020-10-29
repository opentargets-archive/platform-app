import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(theme => ({
  externalLinks: {
    '& > :not(:first-child):before': {
      content: '" | "',
    },
  },
  mainIconContainer: {
    width: '56px',
    textAlign: 'center',
    marginRight: '4px',
  },
  mainIcon: {
    height: '65px',
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
  Icon,
  title,
  subtitle = null,
  externalLinks,
  rightContent = null,
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
                {title}
              </Typography>
              <Typography className={classes.subtitle} variant="subtitle2">
                {subtitle}
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant="body2" className={classes.externalLinks}>
                {externalLinks}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>{rightContent}</Grid>
    </Grid>
  );
}

export default Header;
