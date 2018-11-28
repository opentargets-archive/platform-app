import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import KnownDrugsDetail from './KnownDrugsDetail';

const knownDrugsQuery = gql`
  query KnownDrugsQuery($ensgId: String!) {
    trialStatus: __type(name: "TrialStatus") {
      enumValues {
        name
        description
      }
    }
    targetDetailDrugs(ensgId: $ensgId) {
      rows {
        targetId
        targetSymbol
        targetClass
        efoId
        efoLabel
        drugId
        drugName
        drugType
        phase
        status
        activity
        evidenceUrl
        evidenceSource
        mechanismOfAction
        mechanismOfActionUrl
        mechanismOfActionSource
      }
    }
  }
`;

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
        <Query query={knownDrugsQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            return (
              <KnownDrugsDetail ensgId={ensgId} symbol={symbol} data={data} />
            );
          }}
        </Query>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(KnownDrugsModal);
