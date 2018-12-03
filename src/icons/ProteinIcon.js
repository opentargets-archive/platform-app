import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main,
  },
});

const ProteinIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
    >
      <path
        d="M95.27 21.24a3.86 3.86 0 1 0-3.75-4.74l-19.04
        3.86a6.58 6.58 0 0 0-4.7-3.5l-.3-8.39a4.41 4.41 0
        1 0-2.75.23l.3 8.25a6.59 6.59 0 0 0-3.93 2.79L45.49
        10.3a3.86 3.86 0 1 0-1.57 2.27l16.18 9.8a6.55 6.55
        0 0 0 .5 3.67L36.03 50.56a6.56 6.56 0 0 0-7.8-.39L16.57
        38.51a5.38 5.38 0 1 0-2.13 1.77L26.3 52.14a6.55 6.55 0
        0 0-.86 4.97L8.62 62.76a3.85 3.85 0 1 0 .59
        2.7l17.4-5.84a6.57 6.57 0 0 0 4.18 2.53v9.88a4.4 4.4 0
        1 0 2.76.28v-10.3a6.6 6.6 0 0 0 4.27-3.57l22.25
        4.48c-.03.23-.07.46-.07.7a5.13 5.13 0 0 0 6.21 5l3.64
        9a4.48 4.48 0 0 0-1.23 5.6l-7.38 7.74c-.04
        0-.07-.03-.1-.04a3.86 3.86 0 1 0 2.14 1.9l7.28-7.64a4.5
        4.5 0 0 0 5.19-.68l13.7 9.2a3.8 3.8 0 0 0 3.63 5.12 3.86
        3.86 0 1 0-1.84-7.23l-14.12-9.5a4.55 4.55 0 0
        0-4.46-5.47l-.23.02-3.75-9.34a5.13 5.13 0 0 0-3.55-8.8c-1.6
        0-3 .74-3.95 1.88l-22.74-4.65v-.07c0-1.06-.26-2.05-.7-2.93l24.5-24.48a6.55
        6.55 0 0 0 8.02.56l12.7 12.7A4.39 4.39 0 0 0 87 47.72a4.41 4.41 0 1
        0-2.16-8.24L72.18 26.83c.64-1.02 1.01-2.21 1.01-3.5l-.01-.3
        18.72-3.8c.66 1.2 1.91 2.01 3.37 2.01z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(ProteinIcon);
