import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faArrowsAltH,
  faExpandArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Typography, Tooltip, withTheme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

function MethodIcon(props) {
  const theme = useTheme();
  return (
    <Tooltip title={props.enabled ? props.tooltip : 'no data'} placement="top">
      <span
        className="fa-layers fa-fw"
        style={{
          marginRight: '20px',
          color: props.enabled ? undefined : theme.palette.text.disabled,
        }}
      >
        <FontAwesomeIcon icon={faCircle} size="2x" />
        {props.children}
      </span>
    </Tooltip>
  );
}

const MethodIconText = props => {
  return (
    <MethodIcon {...props}>
      <span
        className="fa-layers-text fa-inverse"
        data-fa-transform="shrink-10 left-2"
        style={{ left: '82%' }}
      >
        {props.children}
      </span>
    </MethodIcon>
  );
};

const MethodIconExpandArrow = props => (
  <MethodIcon {...props}>
    <FontAwesomeIcon
      icon={faExpandArrowsAlt}
      size="2x"
      inverse
      transform="shrink-6 right-1"
    />
  </MethodIcon>
);

const MethodIconArrow = props => (
  <MethodIcon {...props}>
    <FontAwesomeIcon
      icon={faArrowsAltH}
      size="2x"
      inverse
      transform="shrink-6"
    />
  </MethodIcon>
);

export { MethodIconText };
export { MethodIconExpandArrow };
export { MethodIconArrow };
