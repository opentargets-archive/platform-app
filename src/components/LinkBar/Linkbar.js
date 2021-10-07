import React from 'react';
import { withStyles } from '@material-ui/core';

const LinkBar = ({ classes, title, url }) => (
  <>
    <div className={classes.wrapper}>
      <a className={classes.link} href={url}>{title}</a>
    </div>
  </>
);

LinkBar.defaultProps = {
  title: 'National Cancer Institute - cancer.gov',
  url: 'https://www.cancer.gov/',
};

const styles = () => ({
  wrapper: {
    width: '100%',
    height: '20px',
    margin: '0 auto',
    display: 'flex',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0px',
    zIndex: '1201',
    background: '#F1F1F1',
    borderBottom: '1px #999999 solid',
  },
  link: {
    textDecoration: 'none',
    color: '#333333',
    fontFamily: 'Raleway',
    fontSize: '10px',
  },
});

export default withStyles(styles)(LinkBar);