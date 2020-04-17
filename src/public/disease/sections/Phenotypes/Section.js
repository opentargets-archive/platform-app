import React from 'react';
import * as d3 from 'd3';

import { Link } from 'ot-ui';

const Section = ({ name, data }) => {
  const { rows } = data;
  return (
    <ul>
      {rows
        .sort((a, b) =>
          d3.ascending(a.name.toLowerCase(), b.name.toLowerCase())
        )
        .map((d) => (
          <li key={d.id}>
            <Link external to={d.url}>
              {d.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Section;
