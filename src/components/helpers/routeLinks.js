import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function linkIsInternal(linkElement) {
  return (linkElement.substring(0, 1) === '/');
}

function linkIsEmail(linkElement) {
  return (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(linkElement));
}

const RouteLinks = ({ title, to, children }) => (linkIsEmail(to)
  ? (
    <a href={`mailto:${to}`}>{children}</a>
  )
  : (linkIsInternal(to)
    ? (
        <Link to={to} title={title}>
          {children}
        </Link>
    )
    : (
      <a
        href={to}
        target="external-url"
      >
        {children}
      </a>
    )
  ));

RouteLinks.propTypes = {
  to: PropTypes.string.isRequired,
};

export default RouteLinks;