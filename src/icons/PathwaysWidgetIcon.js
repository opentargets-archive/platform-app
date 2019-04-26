import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const PathwaysWidgetIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      {...rest}
    >
      <path d="M478.39,205.18,405,131.83a12.22,12.22,0,0,0-17.28,17.28l52.49,52.49H396.4c-63.81,0-109,20.9-134.48,60.93V47.73l52.49,52.49a12.22,12.22,0,0,0,17.28-17.28L258.35,9.59a12.19,12.19,0,0,0-17.28,0L167.72,82.94A12.22,12.22,0,0,0,185,100.22l52.49-52.49v214.8C212,222.49,166.82,201.6,103,201.6H59.16l52.49-52.49a12.22,12.22,0,0,0-17.28-17.28L21,205.18a12.22,12.22,0,0,0,0,17.28l73.35,73.35a12.22,12.22,0,1,0,17.28-17.28L59.16,226H103c90.5,0,134.48,44,134.48,134.48V482.76a12.22,12.22,0,1,0,24.44,0V360.52c0-90.5,44-134.48,134.48-134.48h43.85l-52.49,52.49a12.22,12.22,0,1,0,17.28,17.28l73.35-73.35a12.23,12.23,0,0,0,0-17.28Z" />
    </SvgIcon>
  );
};

export default withStyles(styles)(PathwaysWidgetIcon);
