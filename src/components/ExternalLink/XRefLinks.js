import React, { Fragment } from 'react';
import Link from '../Link';

function XRefLinks({ label, urlStem, ids }) {
  return (
    <span>
      {label}:{' '}
      {ids.map((id, i) => (
        <Fragment key={id}>
          <Link external to={`${urlStem}${id}`}>
            {id}
          </Link>
          {i < ids.length - 1 ? ', ' : ''}
        </Fragment>
      ))}
    </span>
  );
}

export default XRefLinks;
