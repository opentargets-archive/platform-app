import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  titleContainer: {
    marginBottom: '10px',
  },
  mainIcon: {
    width: '40px',
    height: '65px',
    fill: theme.palette.primary.main,
    marginRight: '12px',
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
  <Fragment>
    <Grid className={classes.titleContainer} container justify="space-between">
      <Grid item>
        <Grid container>
          <Grid item>
            <Icon classes={{ root: classes.mainIcon }} />
          </Grid>
          <Grid item>
            <Grid container>
              <Typography className={classes.title} variant="h4">
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
  </Fragment>
);

export default withStyles(styles)(Header);
