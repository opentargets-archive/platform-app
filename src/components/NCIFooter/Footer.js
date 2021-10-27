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
  footerText: {
    color: 'white',
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 400,
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    lineHeight: '1.71',
    whiteSpace: 'nowrap',
    '@media (max-width: 600px)': {
      fontSize: 12,
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
  listHeader: {
    paddingBottom: '4px',
    fontWeight: 500,
    fontSize: '25px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  },
  footerRoot: (props) => ({
    background: '#0B446B',
  }),
  footerComponent: {
    lineHeight: '1.42857143',
    maxWidth: '1800px',
    margin: '0 60px',
    '-webkit-font-smoothing': 'antialiased',
    color: 'white',
    padding: '24px 45px 45px 45px',
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

  paddingLeft17:{
    paddingLeft: '17px',
  },
  footerRowSection: {
    marginTop: '16px',
    '@media (max-width: 900px)': {
      margin: '0 auto',
    },
  },
  footerRowSectionLinks: {
    marginTop: '16px',
    '& li': {
      float: 'left',
    },
    '@media (max-width: 900px)': {
      margin: '0 auto',
    },
  },
  turningNIH: {
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none',
  },
  footorVersiontext: {
    fontSize: '8px',
    color: 'white',
    textDecoration: 'none',
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    marginLeft: 16,
  },
  footerNciColumn: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '30px',
    '@media (min-width: 600px)': {
      width: '200px',
    },

    '@media (min-width: 960px)': {
      width: '300px',
    },

    '& .nciBadge': {
      border: '0',
      height: '40px',
    },
  },

  footerBar: {
    color: 'white',
    backgroundColor: '#4F536B',
    width: '100%',
    textAlign: 'center',
    '-webkit-font-smoothing': 'antialiased',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '14px',
    marginTop: '48px',
  },
  contentJustifyCenter: {
    justifyContent: 'center',
  },
  contentJustifyLeft: {
    justifyContent: 'left',
  },
  horizontalLine: {
    width: '100%',
    margin: '32px auto 16px auto',
    borderTop: '1px solid #2E5573',
  },
  marginRight40: {
    marginRight: '40px',
  },
  nciLogo: {
    '@media (min-width: 960px)': {
      width: 'calc((100vw)/4)',
    },
  },
});

const Footer = ({ classes, data }) => (
  <div className={classes.footerRoot}>
    <div className={classes.footerComponent}>
      <div className={cn(classes.footerRow,classes.padding20)}>
        <div className={
            cn(classes.footerRowSection, classes.footerNciColumn, classes.marginRight40)
  }
        >
          {data.footerLogoHyperlink
            ? (
              <RouteLinks to={data.footerLogoHyperlink} className={classes.nciLogo}>
                <img
                  src={data.footerLogoImage}
                  alt={data.footerLogoAltText}
                  id="footer_logo_image"
                />
              </RouteLinks>
            ) : (
              <img
                src={data.footerLogoImage}
                alt={data.footerLogoAltText}
                className={classes.nciLogo}
              />
            )}
        </div>
        { data.link_sections.slice(0, 3).map((linkSection) => (
          <div className={classes.footerRowSectionLinks}>
            <div
                  className={cn(classes.footerText, classes.listHeader)}
                >
                  { linkSection.title }
                </div>
            <ul>
              { linkSection.items.slice(0, 4).map((footerRowSectionItem) => (
                <li>
                  {footerRowSectionItem.text
                && (
                  <RouteLinks to={footerRowSectionItem.link} title={footerRowSectionItem.title}>
                    <div className={classes.footerText}>
                      {footerRowSectionItem.text}
                    </div>
                  </RouteLinks>
                )}
                  {footerRowSectionItem.icon
                && (
                  <RouteLinks to={footerRowSectionItem.link}>
                    <img
                      src={footerRowSectionItem.icon}
                      alt={data.footerLogoAltText}
                      className={classes.socialIcon}
                    />
                  </RouteLinks>
                )}
                </li>
              ))}
            </ul>
              <div>
                <span className={classes.paddingLeft17}>
                  Version : &nbsp;
                  <RouteLinks to={"https://github.com/CBIIT/ppdc-otp-frontend/tags"}>
                   MTP 1.0.0-alpha
                  </RouteLinks>
                </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className={classes.horizontalLine} />
      </div>
      <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
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