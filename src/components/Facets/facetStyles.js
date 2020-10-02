const { makeStyles } = require('@material-ui/core');

const facetStyles = makeStyles(theme => ({
  accordionSummaryContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
  },

  clearButtonRoot: {
    height: 'unset',
  },

  facetRoot: {
    width: '100%',
  },
  facetSummary: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },

  countLabel: {
    fontSize: '.7rem',
    fontWeight: 'bold',
    color: theme.palette.grey[500],
  },

  formControlLabelRoot: {
    width: '88%',
  },
  FormControlLabelLabel: {
    fontSize: '.9 rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  treeItemLabel: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '93%',
  },
}));

export default facetStyles;
