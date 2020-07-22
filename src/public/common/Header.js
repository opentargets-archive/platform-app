import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
  titleContainer: {
    marginBottom: '10px',
  },
  mainIconContainer: {
    width: '56px',
    textAlign: 'center',
    marginRight: '4px',
  },
  mainIcon: {
    // width: '40px',
    height: '65px',
    color: theme.palette.primary.main,
    // marginRight: '12px',
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  subtitle: {
    display: 'flex',
    paddingLeft: '5px',
    alignItems: 'center',
  },
});

const Header = ({
  classes,
  Icon,
  title,
  subtitle,
  externalLinks,
  rightContent,
}) => (
  <Grid
    className={classes.titleContainer}
    container
    justify="space-between"
    id="profile-page-header-block"
  >
    <Grid item zeroMinWidth>
      <Grid container wrap="nowrap">
        <Grid item className={classes.mainIconContainer}>
          <FontAwesomeIcon icon={Icon} size="3x" className={classes.mainIcon} />
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
            <Typography variant="body2">{externalLinks}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>{rightContent}</Grid>
  </Grid>
);

export default withStyles(styles)(Header);
