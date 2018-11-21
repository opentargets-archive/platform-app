import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { OtTable } from 'ot-ui';

const cancerBiomarkersQuery = gql`
  query CancerBiomarkersQuery($ensgId: String!) {
    targetDetailCancerBiomarkers(ensgId: $ensgId) {
      rows {
        biomarker
        diseases {
          efoId
          efoLabel
        }
        drugName
        associationType
        evidenceLevel
        sources {
          url
          label
        }
      }
    }
  }
`;

const columns = [
  { id: 'biomarker', label: 'Biomarker' },
  {
    id: 'diseases',
    label: 'Disease',
    renderCell: rowData => {
      return rowData.diseases.map(disease => disease.efoLabel).join(', ');
    },
  },
  { id: 'drugName', label: 'Drug' },
  { id: 'associationType', label: 'Association' },
  { id: 'evidenceLevel', label: 'Evidence' },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData => rowData.sources.label,
  },
];

const styles = () => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
});

const CancerBiomarkersModal = ({ classes, open, onClose, ensgId }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>
          Genomic biomarkers of drug responses, and their levels of clinical
          significance as described by Tamborero et al. (2018). This data is
          manually curated by clinical and scientific communities in the field
          of precision oncology.
        </Typography>
        <Query query={cancerBiomarkersQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            const { rows } = data.targetDetailCancerBiomarkers;
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

export default withStyles(styles)(CancerBiomarkersModal);
