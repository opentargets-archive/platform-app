import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const SmallMoleculeIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
    >
      <path
        d="M50.165 3.679L9.237 27.308l.036 47.322 40.964 23.692
        40.927-23.63-.034-47.322L50.165 3.679zM85.368 71.11L50.033
        91.512 14.616 70.968l-.083-40.944L49.869 9.623l35.418 20.542.081 40.945z"
      />
      <path
        d="M49.831 83.545l.007 4.615 32.703-18.881-3.987-2.316zM49.942
        13.735l-.006 4.616 27.408 15.823 4-2.309zM18
        32.196v36.176l4-2.309V34.491z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(SmallMoleculeIcon);
