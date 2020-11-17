import React, { Component } from 'react';
import { Fade, Popper } from '@material-ui/core';

const Tooltip = ({
  classes,
  dataList,
  open,
  anchorEl,
  container,
  children,
}) => (
  <Popper
    open={open}
    anchorEl={anchorEl}
    container={container}
    transition
    placement="top"
    modifiers={{
      preventOverflow: {
        enabled: true,
        boundariesElement: 'window',
      },
    }}
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        {children}
      </Fade>
    )}
  </Popper>
);

function withTooltip(WrappedComponent, TooltipContent, tooltipElementFinder) {
  return class extends Component {
    state = {
      open: false,
      anchorData: null,
      anchorEl: null,
    };

    handleMouseOver = data => {
      const el = tooltipElementFinder(data);
      this.setState({
        open: true,
        anchorData: data,
        anchorEl: el,
      });
    };

    handleMouseLeave = event => {
      this.setState({
        open: false,
        anchorData: null,
        anchorEl: null,
      });
    };

    render() {
      const { anchorEl, anchorData, open } = this.state;
      return (
        <div onMouseLeave={this.handleMouseLeave}>
          <WrappedComponent
            handleMouseover={this.handleMouseOver}
            {...this.props}
          />
          {anchorEl && open && (
            <Tooltip open={open} anchorEl={anchorEl}>
              <TooltipContent data={anchorData} />
            </Tooltip>
          )}
        </div>
      );
    }
  };
}

export default withTooltip;
