import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faArrowsAltH,
  faExpandArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '../../../../components/Tooltip';

function MethodIcon(props) {
  const theme = useTheme();
  const title = !props.enabled
    ? 'no data'
    : Array.isArray(props.tooltip)
    ? props.tooltip.map((m, i) => (
        <span key={i}>
          {m}
          <br />
        </span>
      ))
    : props.tooltip;
  return (
    <Tooltip title={<>{title}</>}>
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
        style={{ left: '80%' }}
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
