import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const RelatedTargetsWidgetIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
    >
      <path
        d="M80 35a15 15 0 0 0-11.8 5.8l-33.7-17A15 15 0 1 0 5 20a15 15 0 0 0
      26.8 9.3L65.5 46a15 15 0 0 0 .1 8.1L32 70.8A15 15 0 0 0 5 80a15 15 0 1 0
      29.5-3.8l34-16.7A15 15 0 1 0 80 35z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(RelatedTargetsWidgetIcon);
