import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import config from '../config';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const {
      message = `Something went wrong. Please contact Open Targets at ${
        config.profile.helpdeskEmail
      }`,
    } = this.props;

    return this.state.hasError ? (
      <Typography
        component="div"
        align="center"
        color="secondary"
        variant="caption"
      >
        {message}
      </Typography>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
