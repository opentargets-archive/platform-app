import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const AntibodyIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
    >
      <path
        d="M89.14 9.48c.01.3-.09.6-.3.83L62.05 39.9v56.08c0
        .64-.52 1.16-1.15 1.16h-9.05c-.64
        0-1.16-.53-1.16-1.16V36.07c0-.31.1-.61.3-.84L80.4 2.68a1.15
        1.15 0 0 1 1.63-.08l6.73 6.08c.23.2.36.49.38.8z"
      />
      <path
        d="M98.81 18.26c.01.28-.09.56-.28.78L72.64 47.66a1.09
        1.09 0 0
        1-1.53.08l-6.72-6.07c-.2-.2-.34-.46-.35-.75-.02-.3.08-.57.28-.78l25.9-28.62c.4-.45
        1.08-.48 1.52-.08l6.71 6.07c.21.18.34.46.36.75zM49.3
        36.06v59.91c0 .64-.52 1.16-1.15 1.16H39.1c-.64
        0-1.16-.52-1.16-1.16V39.9L11.15 10.3a1.16 1.16 0 0 1
        .09-1.63l6.72-6.08c.47-.43 1.2-.39 1.63.08L49
        35.22c.2.24.32.54.3.84z"
      />
      <path
        d="M35.96 40.92a1.1 1.1 0 0 1-.36.75l-6.71
        6.06a1.08 1.08 0 0 1-1.53-.07L1.47
        19.04c-.2-.22-.3-.5-.28-.78.01-.3.14-.57.35-.75l6.71-6.07c.45-.4
        1.13-.37 1.53.08l25.9 28.62c.19.2.29.49.28.78z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(AntibodyIcon);
