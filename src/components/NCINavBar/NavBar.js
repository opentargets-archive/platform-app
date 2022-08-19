import React from 'react';
import SmallerScreenNB from './SmallerScreenNB';
import LargerScreenNB from './LargerScreenNB'

const NavBar = ({
  navBarData, navBarstyling, classes, isSidebarOpened, numberOfCases, components = {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);

  const [mobileView, setMobileView] = React.useState(false);
  const SMALLER_SCREEN_BREAK_POINT = 1133

  React.useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight)
      setMobileView(window.innerWidth < SMALLER_SCREEN_BREAK_POINT)
    };

    handleResize();
    
    window.addEventListener('resize', () => handleResize());
    return () => {
      window.removeEventListener('resize', () => handleResize());
    };
  }, []);

  return (
    mobileView 
      ?   
        <SmallerScreenNB  // NavBar for Smaller Screen (innerWidth < SMALLER_SCREEN_BREAK_POINT)
          navBarData={navBarData}
          navBarstyling={navBarstyling}
          mobileView={mobileView}
          setMobileView={setMobileView}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}/>
      :   
        <LargerScreenNB  // NavBar for Larger screen
          navBarData={navBarData}
          navBarstyling={navBarstyling}/>
  )

}

export default NavBar;