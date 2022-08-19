import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import cn from '../helpers/classNameConcat';
import RouteLinks from '../helpers/routeLinks';

const styles = () => ({
  nciLinks: {
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  },

  footerRoot: () => ({
    background: 'rgb(11, 68, 107)',
    color: 'white',
    width: '100%',
  }),
  
  footerWrapper: {
    fontFamily: 'Lato',
    fontSize: '16px',
    fontWeight: '400',
    textDecoration: 'none',
    position: 'relative',
    margin: '0 auto',
    '@media (min-width: 1253px)': {
      width: '1253px',
    },
    '@media (max-width: 640px)': {
      textAlign: 'center',
    },
  },

  topMenu: {
    padding: '32px 28px 0 28px', 
  },
  
  horizontalLine: {
    width: '100%',
    margin: '8px auto',
    borderTop: '1px solid #2E5573',
  },

  bottomMenu: {
    padding: '0 28px', 
  },

  row: {
    width: '100%',
    display: 'flex',
    '@media (max-width: 640px)': {
      display: 'grid',
    },
  },

  contactUsRow: {
    marginBottom: '8px', 
    paddingBottom: '16px',
  },

  siteVersionInfo: {
    fontSize: '11px',
  },

  col6: {
    width: '100%',
  },
  
  col12: {
    width: '100%',
  },
  
  nihPoliciesCol: {
    marginLeft: '5px',
    '@media (max-width: 640px)': {
      marginLeft: 0,
    },
  },

  logo: {
    display: 'block',
    width: 'fit-content',
    '@media (max-width: 640px)': {
      width: '100%',
      paddingBottom: '50px',
    },
    '&& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  
  nciFooterTitle: {
    margin: '0 0 8px 0',
    fontSize: '25px',
    textAlign: 'left',
    lineHeight: 1.2,
    '@media (max-width: 640px)': {
      textAlign: 'center',
    },
  },
  
  nciFooterSubTitle: {
    fontSize: '16px',
    display: 'block',
  },
  
  h2Title: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '20px',
  },
  
  menuUl: {
    margin: '0',
    marginBottom: '16px',
    paddingLeft: '0',
    listStyle: 'none',
  },
  
  menuLi: {
    lineHeight: 1.5,
    '&& a': {
      color: 'white',
      fontSize: '16px',
      fontWeight: 400,
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  
  menuLink: {
    fontSize: '16px',
    fontWeight: 400,
  },
  
  bottomRow: {
    width: '100%',
    display: 'flex',
    '@media (max-width: 1000px)': {
      display: 'grid',
    },
  },
  
  col2: {
    width: '180px',
    padding: '5px 0 0 0',
    '@media (max-width: 1000px)': {
      padding: '0 0 15px 0',
      textAlign: 'center',
      width: '100%',
    },
  },
  
  caption: {
    fontSize: '11px',
    padding: '5px 0',
    textAlign: 'center',
    marginRight: '90px',
    '&& a': {
      color: 'white',
      fontSize: '12px',
      margin: '0 8px',
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
    '@media (max-width: 640px)': {
      display: 'grid',
      '&& span': {
        display: 'none',
      },
    },
    '@media (max-width: 1000px)': {
      marginRight: '0px',
    },
  },
  
  copyright: {
    textAlign: 'center',
    paddingBottom: '10px',
    '&& span': {
      fontSize: '12px',
    },
  },

});

const Footer = ({ classes, data }) => {
  
  const GFL_LEN = data.global_footer_links.length;

  return (
    <footer className={classes.footerRoot}>
      <div className={classes.footerWrapper}>
        <div className={classes.topMenu}>
          <div className={classes.row}>
            {/* Logo */}
            <div className={classes.col6}>
              <div className={classes.logo}>
                <RouteLinks to={data.footerLogoLink} >
                  <h1 className={classes.nciFooterTitle}>
                    {data.footerTitle}
                    <span className={classes.nciFooterSubTitle}> {data.footerSubTitle} </span>
                  </h1>
                </RouteLinks>
              </div>
            </div>
            {/* Info & Policies */}
            <div className={classes.col6}>
              <div className={classes.row}>
                <div className={classes.col6}>
                  {/* Contact Information */}
                  <div className={cn(classes.row, classes.contactUsRow)}>
                    <div className={classes.col12}>
                      <h2 className={classes.h2Title}>CONTACT INFORMATION</h2>
                      <ul className={classes.menuUl}>
                        <li className={classes.menuLi}>
                          <RouteLinks to={data.contactUs}>Contact Us</RouteLinks>
                        </li>
                      </ul>
                    </div>
                  </div>
                   {/* More Information */}
                  <div className={classes.row} >
                   <div className={classes.col12}>
                     <h2 className={classes.h2Title}>MORE INFORMATION</h2>
                     <ul className={classes.menuUl}>
                        <li className={classes.menuLi}>
                          <RouteLinks to={data.aboutPage}>About MTP</RouteLinks>
                        </li>
                     </ul>
                   </div>
                 </div>
                </div>
                {/* NIH Policies */}
                <div className={cn(classes.col6, classes.nihPoliciesCol)}>
                  <h2 className={classes.h2Title}>NIH POLICIES</h2>
                  <ul className={classes.menuUl}>
                    <li className={classes.menuLi}>
                      <RouteLinks to={data.policies}>Policies</RouteLinks>
                    </li>
                    <li className={classes.menuLi}>
                      <RouteLinks to={data.disclaimer}>Disclaimer</RouteLinks>
                    </li>
                    <li className={classes.menuLi}>
                      <RouteLinks to={data.accessibility}>Accessibility</RouteLinks>
                    </li>
                    <li className={classes.menuLi}>
                      <RouteLinks to={data.FOIA}>FOIA</RouteLinks>
                    </li>
                    <li className={classes.menuLi}>
                      <RouteLinks to={data.vulnerability}>HHS Vulnerability Disclosure</RouteLinks>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hr */}
        <div>
          <div className={classes.horizontalLine} />
        </div>
        <div className={classes.bottomMenu}>
          <div className={classes.bottomRow}>
            {/* Version */}
            <div className={classes.col2}>
              <div className={classes.siteVersionInfo}> FE Version:&nbsp;{data.FEversion} </div>
              <div className={classes.siteVersionInfo}> BE Version:&nbsp;{data.BEversion} </div>
            </div>
            { /* NCI Links */}
            <div className={classes.col12}>
              <div className={classes.caption}>
                {data.global_footer_links.slice(0, GFL_LEN).map((nciLink, index) => (
                  <Fragment key={index}>
                    <RouteLinks to={nciLink.link}>
                      {nciLink.text}
                    </RouteLinks>
                    { index !== GFL_LEN-1 ? <span className={classes.ext}>&nbsp;|&nbsp;</span> : null}
                  </Fragment>
                ))}
              </div> 
            </div>
          </div>
          { /* Copyright */}
          <div className={classes.row} >
            <div className={classes.col12}>
              <div className={classes.copyright}>
                <span>{data.footerStaticText}</span>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  background: '#23355B',
};

export default withStyles(styles)(Footer);