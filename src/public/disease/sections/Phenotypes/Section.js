import React from 'react';
import * as d3 from 'd3';

import { Link } from 'ot-ui';

const Section = ({ data }) => {
  return (
    <ul>
      {data
        .sort((a, b) =>
          d3.ascending(a.name.toLowerCase(), b.name.toLowerCase())
        )
        .map(d => {
          return (
            <li key={d.url}>
              <Link external to={d.url}>
                {d.name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default Section;
