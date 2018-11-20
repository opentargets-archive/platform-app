import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import { OtTable } from 'ot-ui';

const knownDrugsQuery = gql`
  query KnownDrugsQuery($ensgId: String!) {
    targetDetailDrugs(ensgId: $ensgId) {
      rows {
        efoLabel
        drugName
        phase
        status
        drugType
        mechanismOfAction
        activity
        targetSymbol
        targetClass
        evidenceSource
      }
    }
  }
`;

const columns = [
  {
    id: 'efoLabel',
    label: 'Disease',
  },
  { id: 'drugName', label: 'Drug' },
  {
    id: 'phase',
    label: 'Phase',
  },
  {
    id: 'status',
    label: 'Status',
  },
  { id: 'drugType', label: 'Type' },
  { id: 'mechanismOfAction', label: 'Mechanism of action' },
  { id: 'activity', label: 'Activity' },
  { id: 'targetSymbol', label: 'Target' },
  { id: 'targetClass', label: 'Target class' },
  { id: 'evidenceSource', label: 'Evidence curated from' },
];

const styles = theme => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
});

const KnownDrugsModal = ({ classes, open, onClose, ensgId, symbol }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>
          Drugs in clinical trials or approved for {symbol}
        </Typography>
        <Query query={knownDrugsQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            const { rows } = data.targetDetailDrugs;
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

export default withStyles(styles)(KnownDrugsModal);
