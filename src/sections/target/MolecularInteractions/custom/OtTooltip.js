import { Tooltip, withStyles } from '@material-ui/core';

const OtTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.text.primary,
  },
}))(Tooltip);

export default OtTooltip;
