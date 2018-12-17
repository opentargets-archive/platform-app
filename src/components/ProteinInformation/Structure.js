import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { OtTable } from 'ot-ui';

import LiteMolRenderer from './LiteMolRenderer';

const columns = (pdbId, handleChangePdbId) => [
  {
    id: 'id',
    label: 'PDB ID',
    renderCell: d => (
      <a
        href={`https://www.ebi.ac.uk/pdbe/entry/pdb/${d.pdbId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {d.pdbId === pdbId ? (
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {d.pdbId.toUpperCase()}
          </span>
        ) : (
          d.pdbId.toUpperCase()
        )}
      </a>
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
    label: 'Resolution (Å)',
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
    label: 'Display',
    renderCell: d => (
      <a href="#" onClick={() => handleChangePdbId(d.pdbId)}>
        View
      </a>
    ),
  },
];

const styles = theme => ({
  secondaryStructure: {
    height: '1.4em',
    width: '100%',
    background: '#f1f1f1',
  },
  secondaryStructureFeature: {
    height: '100%',
  },
  secondaryStructureHELIX: {
    fill: '#89B6F9',
  },
  secondaryStructureTURN: {
    fill: '#EC38A6',
  },
  secondaryStructureSTRAND: {
    fill: '#B0FBA4',
  },
  legend: {
    paddingLeft: '5px',
    paddingRight: '3px',
    marginLeft: '9px',
  },
  legendHELIX: {
    borderLeft: '0.5em solid #89B6F9',
  },
  legendTURN: {
    borderLeft: '0.5em solid #EC38A6',
  },
  legendSTRAND: {
    borderLeft: '0.5em solid #B0FBA4',
  },
});

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
    const { classes, structuralFeatures, sequenceLength } = this.props;
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
          <Grid item xs={12}>
            <Typography variant="h6">Secondary structure</Typography>
            <svg className={classes.secondaryStructure}>
              {structuralFeatures.map((d, i) => (
                <rect
                  key={i}
                  className={classNames(
                    classes.secondaryStructureFeature,
                    classes[`secondaryStructure${d.type}`]
                  )}
                  x={`${(d.start * 100) / sequenceLength}%`}
                  width={`${((d.end - d.start) * 100) / sequenceLength}%`}
                />
              ))}
            </svg>
            <Typography>
              Legend:{' '}
              <span className={classNames(classes.legend, classes.legendHELIX)}>
                Helix
              </span>
              <span className={classNames(classes.legend, classes.legendTURN)}>
                Turn
              </span>
              <span
                className={classNames(classes.legend, classes.legendSTRAND)}
              >
                Beta strand
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Structure);
