import React from 'react';
import { withStyles } from '@material-ui/core';
import LinkBar from '../LinkBar';
import NCINavBar from '../NCINavBar';
import NCILogoBar from '../NCILogoBar';
import NCITagLine from '../NCITagLine';

const styles = ()=>({
  headerBar:{
      color: '#8A95A7',
      width: '100%',
      margin: '0 auto',
      minHeight: '100px',
      justifyContent: 'space-between',
      background: '#ffffff',
      position: 'fixed',
      zIndex: '40002',
      top: 0,
    }
});

const NCIHeader = ({ classes, ...props }) => {
  return (
    <div id="header" className={classes.headerBar}>
      <LinkBar />
      <NCILogoBar />
      <NCITagLine />
      <NCINavBar />
    </div>
  );
};


export default withStyles(styles)(NCIHeader);
