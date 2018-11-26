import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import { OtTable } from 'ot-ui';

const knownDrugsQuery = gql`
  query ChemicalProbesQuery($ensgId: String!) {
    targetDetailChemicalProbes(ensgId: $ensgId) {
      rows {
        chemicalprobe
        note
        sources {
          url
          label
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'chemicalprobe',
    label: 'Probe',
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData => (
      <React.Fragment>
        {rowData.sources.map((d, i, a) => (
          <React.Fragment key={i}>
            <a href={d.url} target="_blank" rel="noopener noreferrer">
              {d.label}
            </a>
            {i < a.length - 1 ? ' / ' : ''}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
  },
  {
    id: 'note',
    label: 'Notes',
  },
];

const styles = theme => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '30px auto',
  },
});

const ChemicalProbesModal = ({ classes, open, onClose, ensgId, symbol }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography component="h2">ChemicalProbes for {symbol}</Typography>
        <Query query={knownDrugsQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            const { rows } = data.targetDetailChemicalProbes;
            console.log('Dataaaa! ', rows);
            return (
              <OtTable
                loading={loading}
                error={error}
                columns={columns}
                data={rows}
              />
            );
          }}
        </Query>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(ChemicalProbesModal);
