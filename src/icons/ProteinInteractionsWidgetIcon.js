import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const ProteinInteractionsWidgetIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 372 400"
      {...rest}
    >
      <path d="M355 273h-14.4v-24.9a6.8 6.8 0 0 0-6.8-6.8h-67.3v-17h14.3a11.8 11.8 0 0 0 11.8-11.7v-25a11.8 11.8 0 0 0-11.8-11.7h-14.3v-25.3a6.8 6.8 0 0 0-6.8-6.8h-67.3v-17.4h14.3a11.8 11.8 0 0 0 11.8-11.7v-25A11.8 11.8 0 0 0 206.7 78H164a11.8 11.8 0 0 0-11.7 11.7v25a11.8 11.8 0 0 0 11.7 11.7h14.4v17.4H111a6.8 6.8 0 0 0-6.8 6.8v25H89.9a11.8 11.8 0 0 0-11.7 11.7v25A11.8 11.8 0 0 0 89.9 224h14.4v17H37a6.8 6.8 0 0 0-6.8 6.8v25H15.8a11.8 11.8 0 0 0-11.7 11.7v25a11.8 11.8 0 0 0 11.7 11.7h42.7a11.8 11.8 0 0 0 11.8-11.8v-25a11.8 11.8 0 0 0-11.8-11.7H44.2V255h60v17.8H90a11.8 11.8 0 0 0-11.7 11.7v25A11.8 11.8 0 0 0 89.9 321h42.7a11.8 11.8 0 0 0 11.7-11.7v-25a11.8 11.8 0 0 0-11.7-11.7h-14.3V224h14.3a11.8 11.8 0 0 0 11.7-11.7v-25a11.8 11.8 0 0 0-11.7-11.7h-14.3v-17.8h60v17.8H164a11.8 11.8 0 0 0-11.7 11.7v25A11.8 11.8 0 0 0 164 224h42.7a11.8 11.8 0 0 0 11.7-11.7v-25a11.8 11.8 0 0 0-11.7-11.7h-14.4v-17.8h60.1v17.8h-14.3a11.8 11.8 0 0 0-11.8 11.7v25a11.8 11.8 0 0 0 11.8 11.7h14.3v17h-66.8a6.8 6.8 0 0 0-6.8 6.8v25h-14.4a11.8 11.8 0 0 0-11.7 11.7v25a11.8 11.8 0 0 0 11.7 11.7H207a11.8 11.8 0 0 0 11.7-11.8v-25a11.8 11.8 0 0 0-11.7-11.7h-14.4V255h60.1v17.8h-14.3a11.8 11.8 0 0 0-11.8 11.7v25a11.8 11.8 0 0 0 11.8 11.7h42.7a11.8 11.8 0 0 0 11.7-11.8v-25a11.8 11.8 0 0 0-11.7-11.7h-14.4V255H327v17.8h-14.3a11.8 11.8 0 0 0-11.8 11.7v25a11.8 11.8 0 0 0 11.7 11.7h42.8a11.8 11.8 0 0 0 11.7-11.8v-25c0-6-5.3-11.3-12-11.3z" />
    </SvgIcon>
  );
};

export default withStyles(styles)(ProteinInteractionsWidgetIcon);
