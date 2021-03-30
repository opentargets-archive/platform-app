import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faArrowsAltH,
  faExpandArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../../../../components/Tooltip';

function MethodIcon({
  tooltip,
  enabled = true,
  children,
  notooltip,
  small = false,
}) {
  const title = !enabled
    ? 'no data'
    : Array.isArray(tooltip)
    ? tooltip.map((m, i) => (
        <span key={i}>
          {m}
          <br />
        </span>
      ))
    : tooltip || 'no data';
  const icon = (
    <span
      className="fa-layers fa-fw"
      style={{
        marginRight: '20px',
        color: enabled ? undefined : ' #e0e0e0', // theme.palette.text.disabled,
        cursor: tooltip ? 'help' : 'default',
        fontSize: small ? '0.7em' : '',
        marginBottom: small ? '0.1em' : '',
      }}
    >
      <FontAwesomeIcon icon={faCircle} size="2x" />
      {children}
    </span>
  );

  return notooltip ? (
    <>{icon}</>
  ) : (
    <Tooltip title={<>{title}</>}>{icon}</Tooltip>
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
