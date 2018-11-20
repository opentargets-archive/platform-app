import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const knownDrugsQuery = gql`
  query KnownDrugsQuery($ensgId: String!) {
    targetDetailDrugs(ensgId: $ensgId) {
      rows {
        targetId
      }
    }
  }
`;

const KnownDrugsModal = ({ open, onClose, ensgId, symbol }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container justify="space-around">
        <Grid item md={10}>
          <Paper>
            <Typography>
              Drugs in clinical trials or approved for {symbol}
            </Typography>
            <Query query={knownDrugsQuery} variables={{ ensgId }}>
              {({ loading, error, data }) => {
                if (loading || error) return null;
                console.log('data', data);
                return <div>hey there</div>;
              }}
            </Query>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default KnownDrugsModal;
