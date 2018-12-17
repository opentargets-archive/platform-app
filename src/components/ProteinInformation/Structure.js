import React from 'react';
import Grid from '@material-ui/core/Grid';

import { OtTable } from 'ot-ui';

import LiteMolRenderer from './LiteMolRenderer';

const columns = (pdbId, handleChangePdbId) => [
  {
    id: 'id',
    label: 'PDB ID',
    renderCell: d =>
      d.pdbId === pdbId ? (
        <strong>{d.pdbId.toUpperCase()}</strong>
      ) : (
        d.pdbId.toUpperCase()
      ),
  },
  {
    id: 'method',
    label: 'Method',
  },
  {
    id: 'coverage',
    label: 'Coverage',
  },
  {
    id: 'resolution',
    label: 'Resolution',
  },
  {
    id: 'chain',
    label: 'Chain',
  },
  {
    id: 'start',
    label: 'Position',
    renderCell: d => `${d.start} - ${d.end}`,
  },
  {
    id: 'view',
    label: '',
    renderCell: d => (
      <a href="#" onClick={() => handleChangePdbId(d.pdbId)}>
        View
      </a>
    ),
  },
];

class Structure extends React.Component {
  state = {};
  componentDidMount() {
    const { pdbId, pdbs } = this.props;
    this.setState({ pdbId, pdbs });
  }
  handleChangePdbId = pdbId => {
    this.setState({ pdbId });
  };
  render() {
    const { pdbId, pdbs } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={6}>
            {pdbId ? <LiteMolRenderer pdbId={pdbId} /> : null}
          </Grid>
          <Grid item xs={12} md={6}>
            <OtTable
              message={
                <React.Fragment>
                  Currently viewing{' '}
                  <strong>
                    {pdbId ? pdbId.toUpperCase() : 'no structure'}
                  </strong>
                </React.Fragment>
              }
              loading={false}
              error={null}
              columns={columns(pdbId, this.handleChangePdbId)}
              data={pdbs || []}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Structure;
