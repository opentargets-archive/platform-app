import React, { Fragment } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

// make a style hook to share between the components in this file
const useStyles = makeStyles(theme => ({
  table: {
    borderCollapse: 'collapse',
    marginBottom: '8px',
  },
  cell: {
    padding: '4px',
    color: theme.palette.grey[700],
    border: `1px solid ${theme.palette.grey[700]}`,
  },
  purpleCell: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    color: 'white',
  },
}));

const Section = ({ data }) => {
  const classes = useStyles();
  const isSmallMoleculeCellPurple = bucket =>
    _.get(data, 'smallmolecule.buckets', []).indexOf(bucket) >= 0;
  const isAntibodyCellPurple = bucket =>
    _.get(data, 'antibody.buckets', []).indexOf(bucket) >= 0;
  const isOtherModalitiesCellPurple = bucket =>
    _.get(data, 'otherModalities.buckets', []).indexOf(bucket) >= 0;
  return (
    <Fragment>
      <Typography variant="h6">Small molecule</Typography>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Clinical precedence</Typography>
            </th>
            <th className={classes.cell} colSpan="2">
              <Typography variant="subtitle2">Discovery precedence</Typography>
            </th>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Predicted tractable</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* clinical precedence */}
            <BucketCell isPurple={isSmallMoleculeCellPurple(1)}>
              Phase 4
            </BucketCell>
            <BucketCell isPurple={isSmallMoleculeCellPurple(2)}>
              Phase 2 or 3
            </BucketCell>
            <BucketCell isPurple={isSmallMoleculeCellPurple(3)}>
              Phase 0 or 1
            </BucketCell>
            {/* discovery precedence */}
            <BucketCell isPurple={isSmallMoleculeCellPurple(4)}>
              PDB targets with ligands
            </BucketCell>
            <BucketCell isPurple={isSmallMoleculeCellPurple(7)}>
              Active compounds in ChEMBL
            </BucketCell>
            {/* predicted tractable */}
            <BucketCell isPurple={isSmallMoleculeCellPurple(5)}>
              DrugEBIlity score > 0.7
            </BucketCell>
            <BucketCell isPurple={isSmallMoleculeCellPurple(6)}>
              DrugEBIlity score 0 to 0.7
            </BucketCell>
            <BucketCell isPurple={isSmallMoleculeCellPurple(8)}>
              Druggable genome
            </BucketCell>
          </tr>
        </tbody>
      </table>
      <Typography variant="h6">Antibody</Typography>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Clinical precedence</Typography>
            </th>
            <th className={classes.cell} colSpan="2">
              <Typography variant="subtitle2">
                Predicted tractable - high confidence
              </Typography>
            </th>
            <th className={classes.cell} colSpan="4">
              <Typography variant="subtitle2">
                Predicted tractable - medium to low confidence
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* clinical precedence */}
            <BucketCell isPurple={isAntibodyCellPurple(1)}>Phase 4</BucketCell>
            <BucketCell isPurple={isAntibodyCellPurple(2)}>
              Phase 2 or 3
            </BucketCell>
            <BucketCell isPurple={isAntibodyCellPurple(3)}>
              Phase 0 or 1
            </BucketCell>
            {/* predicted tractable (high) */}
            <BucketCell isPurple={isAntibodyCellPurple(4)}>
              UniProt location - high confidence
            </BucketCell>
            <BucketCell isPurple={isAntibodyCellPurple(5)}>
              GO cell component - high confidence
            </BucketCell>
            {/* predicted tractable (mid-low) */}
            <BucketCell isPurple={isAntibodyCellPurple(6)}>
              UniProt location - low or unknown confidence
            </BucketCell>
            <BucketCell isPurple={isAntibodyCellPurple(7)}>
              UniProt predicted signal peptide or transmembrane region
            </BucketCell>
            <BucketCell isPurple={isAntibodyCellPurple(8)}>
              GO cell component - medium confidence
            </BucketCell>
            {/* predicted tractable (HPA) */}
            <BucketCell isPurple={isAntibodyCellPurple(9)}>
              Human Protein Atlas - high confidence
            </BucketCell>
          </tr>
        </tbody>
      </table>
      <Typography variant="h6">
        Other modalities (protein, enzyme, oligonucleotide, etc.)
      </Typography>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.cell} colSpan="3">
              <Typography variant="subtitle2">Clinical precedence</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <BucketCell isPurple={isOtherModalitiesCellPurple(1)}>
              Phase 4
            </BucketCell>
            <BucketCell isPurple={isOtherModalitiesCellPurple(2)}>
              Phase 2 or 3
            </BucketCell>
            <BucketCell isPurple={isOtherModalitiesCellPurple(3)}>
              Phase 0 or 1
            </BucketCell>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

const BucketCell = ({ isPurple, children }) => {
  const classes = useStyles();
  return (
    <td
      className={classNames(classes.cell, { [classes.purpleCell]: isPurple })}
    >
      <Typography color="inherit" variant="caption">
        {children}
      </Typography>
    </td>
  );
};

export default Section;
