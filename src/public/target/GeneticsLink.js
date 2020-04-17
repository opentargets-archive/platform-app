import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  geneticsLink: {
    alignItems: 'center',
    display: 'flex',
    height: '35px',
    fontSize: '13px',
    fontWeight: '500',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '0 10px',
    textDecoration: 'none',
  },
});

const GeneticsLink = ({ classes, ensgId, symbol }) => (
  <a
    className={classes.geneticsLink}
    href={`https://genetics.opentargets.org/gene/${ensgId}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    View {symbol} in Open Targets Genetics
  </a>
);

export default withStyles(styles)(GeneticsLink);
