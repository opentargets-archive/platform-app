import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const OtherDrugsIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 24"
      {...rest}
    >
      <path
        d="M17 3.5v-2c0-.83-.67-1.5-1.5-1.5h-13C1.67 0 1 .67
        1 1.5v2c0 .63.4 1.2 1 1.4v1.36c0 .38-.12.74-.33 1.05l-.93
        1.6A4.43 4.43 0 0 0 0 11.33v10.38A2.33 2.33 0 0 0 2.37
        24h13.26c1.28.02 2.34-1 2.37-2.28V11.34c0-.86-.26-1.7-.73-2.43L16.3
        7.3c-.2-.3-.3-.66-.31-1.03V4.91c.6-.21 1-.78 1-1.41zm-1-2v2a.5.5
        0 0 1-.5.5h-4V1h4c.28 0 .5.22.5.5zM7.5 4V1h3v3h-3zM2
        1.5c0-.28.22-.5.5-.5h4v3h-4a.5.5 0 0 1-.5-.5v-2zm15
        16h-7v-5h7v5zm-.59-8.07l.02.02c.37.56.57 1.22.57 1.9v.15H9.5a.5.5
        0 0 0-.5.5v6a.5.5 0 0 0 .5.5H17v3.22c-.03.73-.64 1.3-1.37
        1.28H2.37A1.33 1.33 0 0 1 1
        21.72V11.34c0-.68.2-1.34.59-1.91l.93-1.59c.31-.47.48-1.02.48-1.58V5h12v1.26c0
        .55.16 1.1.46 1.56l.95 1.61z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(OtherDrugsIcon);
