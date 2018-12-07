import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const CancerBiomarkersWidgetIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
    >
      <path
        d="M51.1 4.8A32.3 32.3 0 0 0 19 37c0 30 30.3 57.4 31.6 58.5l.6.3c.3
      0 .5-.1.7-.3 1.3-1.2 31.6-30 31.6-58.5A32.3 32.3 0 0 0 51 4.8zm24.4 32.5a24.2
      24.2 0 1 1-48.5 0 24.2 24.2 0 0 1 48.5 0z"
      />
      <path
        d="M64.3 31.8H57v-7.3c0-.4-.3-.7-.7-.7h-10c-.4 0-.7.3-.7.7v7.3h-7.4c-.3
      0-.7.3-.7.7v10c0 .4.4.7.7.7h7.4v7.3c0 .4.3.7.7.7h10c.4 0 .7-.3.7-.7v-7.3h7.3c.4
      0 .7-.3.7-.7v-10c0-.4-.3-.7-.7-.7z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(CancerBiomarkersWidgetIcon);
