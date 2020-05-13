import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Link } from 'ot-ui';
import HallmarksTable from './custom/HallmarksTable';

const Section = ({ ensgId, symbol, data }) => {
  const roleInCancer = data.attributes.filter(a => a.name === 'role in cancer');
  console.log('data:', data);
  return (
    <React.Fragment>
      <Typography>
        Role in cancer:{' '}
        {roleInCancer.map((r, i) => (
          <React.Fragment key={i}>
            {i > 0 ? ' | ' : null}
            <Link
              external
              to={`http://europepmc.org/search?query=EXT_ID:$${
                r.reference.pubmedId
              }`}
            >
              {r.reference.description}
            </Link>
          </React.Fragment>
        )) || 'No data'}
      </Typography>
      <HallmarksTable rows={data.rows} symbol={symbol} />
    </React.Fragment>
  );
};

export default Section;
