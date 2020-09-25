const { makeStyles } = require('@material-ui/core');

const facetStyles = makeStyles(theme => ({
  facetRoot: {
    width: '100%',
  },
  treeItemLabelRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 .5rem',
  },
  treeItemLabelText: {
    fontSize: '.9rem',
    flexGrow: 1,
  },
}));

export default facetStyles;
