import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  page: {
    background: theme.palette.grey['50'],
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    width: '100%',
  },
  gridContainer: {
    margin: '230px 0 0 0',
    padding: '24px',
    width: '100%',
    flex: '1 0 auto',
  },
});

class Page extends Component {
  render() {
    const { classes, header, footer, children } = this.props;
    return (
      <div className={classes.page}>
        {header}
        <Grid
          container
          justify={'center'}
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={11}>
            {children}
          </Grid>
        </Grid>
        {footer}
      </div>
    );
  }
}

Page.propTypes = {
  /** The header component */
  header: PropTypes.node,
  /** The footer component */
  footer: PropTypes.node,
  /** The children (page content) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Page.defaultProps = {
  header: null,
  footer: null,
  children: null,
};

export { Page };

export default withStyles(styles)(Page);
