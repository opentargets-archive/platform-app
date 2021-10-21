import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import defaultTheme from '../theme';

class OtUiThemeProvider extends React.Component {
  render() {
    const { children, theme = defaultTheme } = this.props;
    return (
      <MuiThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }
}

export default OtUiThemeProvider;
