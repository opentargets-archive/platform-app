import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  base: {
    fontSize: 'inherit',
    textDecoration: 'none',
  },
  baseDefault: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  baseTooltip: {
    color: 'white',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    textDecoration: 'underline',
  },
  baseFooter: {
    color: 'white',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    display: 'flex',
    alignItems: 'center',
  },
});

class Link extends React.Component {
  render() {
    const {
      classes = {},
      children,
      to,
      onClick,
      external,
      newTab,
      footer,
      tooltip,
      className,
    } = this.props;
    const newTabProps = newTab
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return external ? (
      <a
        className={classNames(
          classes.base,
          {
            [classes.baseDefault]: !footer && !tooltip,
            [classes.baseFooter]: footer,
            [classes.baseTooltip]: tooltip,
          },
          className
        )}
        href={to}
        onClick={onClick}
        {...newTabProps}
      >
        {children}
      </a>
    ) : (
      <RouterLink
        className={classNames(
          classes.base,
          {
            [classes.baseDefault]: !footer && !tooltip,
            [classes.baseFooter]: footer,
            [classes.basetooltip]: tooltip,
          },
          className
        )}
        to={to}
        onClick={onClick}
      >
        {children}
      </RouterLink>
    );
  }
}

Link.propTypes = {
  /** Whether the link directs to an external site. */
  external: PropTypes.bool,
  /** Whether the link is used within the footer section. */
  footer: PropTypes.bool,
  /** Whether the link is used within a tooltip. */
  tooltip: PropTypes.bool,
  /** The handler to call on click. */
  onClick: PropTypes.func,
  /** The url to visit on clicking the link. */
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  external: false,
  footer: false,
  tooltip: false,
  onClick: null,
  to: '/',
};

export default withStyles(styles)(Link);
