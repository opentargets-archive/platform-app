import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Link } from 'ot-ui';

import OrthologyTable from './OrthologyTable';

class OrthologyTableTab extends React.Component {
  render() {
    const { ensgId, symbol } = this.props;
    return (
      <React.Fragment>
        <Typography variant="body2">
          <i>
            Orthology data for {symbol} across a selected set of 12 species.
          </i>
        </Typography>
        <Typography variant="caption">
          Source:
          <Link external to="http://www.ensembl.org">
            Ensembl
          </Link>
        </Typography>
        <OrthologyTable ensgId={ensgId} symbol={symbol} />
      </React.Fragment>
    );
  }
}

export default OrthologyTableTab;
