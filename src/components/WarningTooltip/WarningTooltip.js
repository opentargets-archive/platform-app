import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';

const WarningTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.error.main,
  },
  popper: {
    opacity: 1,
  },
}))(Tooltip);

export default WarningTooltip;
