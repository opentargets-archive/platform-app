import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

const styles = theme => ({
  root: {
    fill: theme.palette.primary.main
  }
});

const TargetIcon = ({ className, classes, ...rest }) => {
  const iconClasses = classNames(classes.root, className);
  return (
    <SvgIcon
      className={iconClasses}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 194 301"
      {...rest}
    >
      <path
        d="M26.2 102.3a165.4 165.4 0 0 0 44.6 47.9A163.4 163.4 0 0 0 25.4
          198a170.8 170.8 0 0 0-21 55.9c-2.2 10.5-3 21-2.6 31.6v1.4c.8 7.6
          7.3 13 15 12.3 7.2-.7 12.6-6.8 12.3-14.1v-9.4c0-1.1 0-2.2.3-3.3h135.8c0
          1 0 2.2.4 3.3.3 3.6.3 6.5 0 8.7a14 14 0 0 0 12.3 15.2h.4c7.6.4 14.1-5
          14.5-12.7v-1.4a160.1 160.1 0 0 0-23.6-87.5 170.6 170.6 0 0 0-46.1-48 162
          162 0 0 0 66.4-104.5c2.2-10.1 3-20.7
          3-31.2v-1.1c-.4-7.6-7-13-14.6-12.7-7.6.4-13 6.9-12.7 14.5 0 2.6 0 5.5-.4
          8.7 0 1.5-.3 2.6-.3
          4h-135c0-1.4-.4-2.5-.4-4-.4-3.6-.4-6.5-.4-8.3.7-7.7-5-14.2-12.3-15A14
          14 0 0 0 1.4 13v1.4C1.2 25 2.3 35.5 4 45.7 8 66 15.6 84.8 26.2
          102.2zM148.9 218c4.7 8.7 8.3 17.8 10.9 27.3H34.5c2.6-9.5 6.2-18.6
          11-27.3h103.4zm-19.7-27.2H65a142.3 142.3 0 0 1 32-25.4c12 7 22.8 15.6 32.3
          25.4zM97 134.5a142.9 142.9 0 0 1-31.6-25.4h63.5c-9.4 10.2-20 18.6-32
          25.5zm62.4-79.8c-3 9.4-6.6 18.5-11.3
          27.2H45.8c-4.8-8.7-8.4-17.8-11.3-27.2h124.9z"
      />
    </SvgIcon>
  );
};

export default withStyles(styles)(TargetIcon);
