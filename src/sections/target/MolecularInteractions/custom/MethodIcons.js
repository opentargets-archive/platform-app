import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

const MethodIconText = props => (
  <span className="fa-layers fa-fw" style={{ marginRight: '20px' }}>
    <FontAwesomeIcon icon={faCircle} size="2x" />
    <span
      className="fa-layers-text fa-inverse"
      data-fa-transform="shrink-10 left-2"
      style={{ left: '82%' }}
    >
      {props.children}
    </span>
  </span>
);

const MethodIconArrow = () => (
  <span className="fa-layers fa-fw" style={{ marginRight: '20px' }}>
    <FontAwesomeIcon icon={faCircle} size="2x" />
    <FontAwesomeIcon
      icon={faArrowsAltH}
      size="2x"
      inverse
      transform="shrink-6"
    />
  </span>
);

export { MethodIconText };
export { MethodIconArrow };
