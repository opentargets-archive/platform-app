import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Link } from 'ot-ui';
import HallmarksTable from './HallmarksTable';

const Section = ({ ensgId, symbol, data }) => (
  <React.Fragment>
    <Typography>
      Role in cancer:{' '}
      {data.roleInCancer.map((r, i) => (
        <React.Fragment key={r.pmId}>
          {i > 0 ? ' | ' : null}
          <Link
            external
            to={`http://europepmc.org/search?query=EXT_ID:$${r.pmId}`}
          >
            {r.name}
          </Link>
        </React.Fragment>
      )) || 'No data'}
    </Typography>
    <HallmarksTable rows={data.rows} symbol={symbol} />
  </React.Fragment>
);

export default Section;
