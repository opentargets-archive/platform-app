import { Tooltip, withStyles } from '@material-ui/core';

const WarningTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.error.main,
  },
  popper: {
    opacity: 1,
  },
}))(Tooltip);

export default WarningTooltip;
