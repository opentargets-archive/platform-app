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
      viewBox="0 0 100 100"
      {...rest}
    >
      <path
        d="M25.46 40.4H23.3l-.01-5.37-17 10.3L23.31 55.5l-.01-5.16h2.15c4.18
      0 5.14 2.73 5.2 4.97v36.63h9.95V55.3c0-6-4.03-14.91-15.15-14.91zM59.94 24L49.64
      6.98 39.45 24.03h5.01v67.92h9.96V24zM94.83 61.37L77.79 51.16v5.34h-3.87c-11.11
      0-15.14 8.95-15.14 14.96v20.49h9.95V71.46c0-1.5.51-5 5.2-5h3.87v5.18l17.03-10.27z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(PathwaysWidgetIcon);
