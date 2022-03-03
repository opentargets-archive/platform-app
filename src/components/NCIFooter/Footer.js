import React from 'react';
import { withStyles } from '@material-ui/core';
import cn from '../helpers/classNameConcat';
import RouteLinks from '../helpers/routeLinks';

const styles = () => ({
  ext: {
    color: 'white',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  extraPadding: {
    marginTop: '10px',
    '@media (max-width: 600px)': {
      marginTop: '0px',
    },
  },

  nciLinks: {
    display: 'flex',
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      marginLeft: '20px',
    },
  },

  footerRoot: (props) => ({
    background: 'rgb(11, 68, 107)',
  }),
  footerComponent: {
    lineHeight: '1.42857143',
    maxWidth: '1800px',
    margin: '0 60px',
    '-webkit-font-smoothing': 'antialiased',
    color: 'white',
    padding: '10px 45px 15px 45px',
    '& ul': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },

    '& li': {
      lineHeight: '2.17',
    },

    /* Style a button like a link for accessibility */
    '& button': {
      background: 'none!important',
      color: 'inherit',
      border: 'none',
      padding: '0!important',
      font: 'inherit',
      cursor: 'pointer',
    },

    '& a, & button': {
      color: 'white',
      textDecoration: 'none',

      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (min-width: 900px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  padding20: {
    padding: '20px',
  },
  footerRowSection: {
    marginTop: '16px',
    '@media (max-width: 900px)': {
      margin: '0 auto',
    },
  },
  turningNIH: {
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none',
  },
  linkSections :{
    paddingTop: '13px',
    display: 'flex',
  },
  linkSectionHead:{
    fontSize: '16px',
    paddingBottom: '6px',
  },
  linkSection:{
    width: "fit-content",
    padding: "5px 20px",
    fontSize: "16px",
    fontWeight: "400",
  },
  contentJustifyCenter: {
    justifyContent: 'center',
  },
  horizontalLine: {
    width: '100%',
    margin: '32px auto 16px auto',
    borderTop: '1px solid #2E5573',
  },
  nciLogo: {
    '@media (min-width: 960px)': {
      width: 'calc((100vw)/4)',
    },
  },
  nciFooterTitle: {
    fontFamily: 'Montserrat', 
    fontWeight: 'bolder', 
    fontSize: '25px', 
    lineHeight: '26px', 
    color: '#fff',
    letterSpacing: '-0.5px'
  },
  nciFooterSubTitle: {
    fontSize: '16px', 
    display: 'block'
  },
  paddingRight60: {
    paddingRight: "60px",
  }
});

const Footer = ({ classes, data }) => (
  <div className={classes.footerRoot}>
    <div className={classes.footerComponent}>
      <div className={cn(classes.footerRow)}>
        <div>
          <h1 className={classes.nciFooterTitle}>
            {data.footerTitle} 
            <span className={classes.nciFooterSubTitle}> {data.footerSubTitle} </span>
          </h1>
        </div>
          <div className={cn(classes.linkSections, classes.contentJustifyCenter)}>
           <div className={classes.linkSection} >
             <div className={classes.linkSectionHead}>CONTACT INFORMATION</div>
              <div>
                 <RouteLinks to={data.contactUs}>
                 Contact US
                  </RouteLinks>
                  </div>
           </div>
           <div className={classes.linkSection}>
             <div className={classes.linkSectionHead}>MORE INFORMATION</div>
              <RouteLinks to={data.aboutPage}>
                 About MTP
              </RouteLinks>
           </div>
           <div className={classes.linkSection}>
             <div className={classes.linkSectionHead}>  NIH POLICIES</div>
              <div>
                  <RouteLinks to={data.policies}>Policies </RouteLinks>
                </div>
               <div>
                  <RouteLinks to={data.disclaimer}>Disclaimer </RouteLinks>
                </div>
               <div>
                  <RouteLinks to={data.accessibility}>Accessibility </RouteLinks>
               </div>

               <div>
                    <RouteLinks to={data.FOIA}>FOIA</RouteLinks>
              </div>
              <div>
                    <RouteLinks to={data.vulnerability}>HHS Vulnerability Disclosure</RouteLinks>
              </div>
              
           </div>
          </div>
      </div>
      <div>
        <div className={classes.horizontalLine} />
      </div>
      <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
        <div className={classes.paddingRight60} >
          <div>FE Version : {data.FEversion} </div>
          <div>BE Version : {data.BEversion} </div>
        </div>
        <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
          {data.global_footer_links.slice(0, 4).map((nciLink) => (
            <div>
              <RouteLinks to={nciLink.link}>
                {nciLink.text}
              </RouteLinks>
              <span className={classes.ext}>&nbsp;|&nbsp;</span>
            </div>
          ))}
        </div>
      </div>
      <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
        <div
          className={cn(
            classes.extraPadding,
            classes.nciLinks,
            classes.contentJustifyCenter,
          )}
        >
          <div>
            <span className={classes.turningNIH}>
              {data.footerStaticText}
            </span>
          </div>
         
        </div>
      </div>
    </div>
  </div>
);

Footer.defaultProps = {
  background: '#23355B',
};

export default withStyles(styles)(Footer);