import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
   taglineRoot: {
    width: '100%',
    background: '#87CEFA',
    fontFamily: 'Montserrat',
    height: '30px',
    color: '#333',
    paddingLeft: '89px',
    fontWeight: '800',
    fontSize: '14px',
    lineHeight: '30px',
  },
});

const TagLine = ({ classes, data }) => (
  <div className={classes.taglineRoot}>
    <div className={classes.taglineText}>
      {data.text}
    </div>
  </div>
);


export default withStyles(styles)(TagLine);