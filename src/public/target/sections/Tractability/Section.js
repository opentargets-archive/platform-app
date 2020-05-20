import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

// generate classNames to share between the components in this file
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

const Section = ({ symbol, data }) => {
  const smallMoleculeBuckets = _.get(data, 'smallmolecule.buckets', []);
  const antibodyBuckets = _.get(data, 'antibody.buckets', []);
  const otherModalitiesBuckets = _.get(data, 'otherModalities.buckets', []);

  return (
    <>
      <Typography variant="h6">Small molecule</Typography>
      {smallMoleculeBuckets.length > 0 ? (
        <SmallMoleculeTable buckets={smallMoleculeBuckets} />
      ) : (
        <Typography>
          No small molecule tractability data for {symbol} available
        </Typography>
      )}
      <Typography variant="h6">Antibody</Typography>
      {antibodyBuckets.length > 0 ? (
        <AntibodyTable buckets={antibodyBuckets} />
      ) : (
        <Typography>
          No antibody tractability data for {symbol} available
        </Typography>
      )}
      <Typography variant="h6">
        Other modalities (protein, enzyme, oligonucleotide, etc.)
      </Typography>
      {otherModalitiesBuckets.length > 0 ? (
        <OtherModalitiesTable buckets={otherModalitiesBuckets} />
      ) : (
        <Typography>
          No other modalities tractability data for {symbol} available
        </Typography>
      )}
    </>
  );
};

const SmallMoleculeTable = ({ buckets }) => {
  const classes = useStyles();
  return (
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
          <BucketCell isPurple={buckets.includes(1)}>Phase 4</BucketCell>
          <BucketCell isPurple={buckets.includes(2)}>Phase 2 or 3</BucketCell>
          <BucketCell isPurple={buckets.includes(3)}>Phase 0 or 1</BucketCell>
          {/* discovery precedence */}
          <BucketCell isPurple={buckets.includes(4)}>
            PDB targets with ligands
          </BucketCell>
          <BucketCell isPurple={buckets.includes(7)}>
            Active compounds in ChEMBL
          </BucketCell>
          {/* predicted tractable */}
          <BucketCell isPurple={buckets.includes(5)}>
            DrugEBIlity score > 0.7
          </BucketCell>
          <BucketCell isPurple={buckets.includes(6)}>
            DrugEBIlity score 0 to 0.7
          </BucketCell>
          <BucketCell isPurple={buckets.includes(8)}>
            Druggable genome
          </BucketCell>
        </tr>
      </tbody>
    </table>
  );
};

const AntibodyTable = ({ buckets }) => {
  const classes = useStyles();
  return (
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
          <BucketCell isPurple={buckets.includes(1)}>Phase 4</BucketCell>
          <BucketCell isPurple={buckets.includes(2)}>Phase 2 or 3</BucketCell>
          <BucketCell isPurple={buckets.includes(3)}>Phase 0 or 1</BucketCell>
          {/* predicted tractable (high) */}
          <BucketCell isPurple={buckets.includes(4)}>
            UniProt location - high confidence
          </BucketCell>
          <BucketCell isPurple={buckets.includes(5)}>
            GO cell component - high confidence
          </BucketCell>
          {/* predicted tractable (mid-low) */}
          <BucketCell isPurple={buckets.includes(6)}>
            UniProt location - low or unknown confidence
          </BucketCell>
          <BucketCell isPurple={buckets.includes(7)}>
            UniProt predicted signal peptide or transmembrane region
          </BucketCell>
          <BucketCell isPurple={buckets.includes(8)}>
            GO cell component - medium confidence
          </BucketCell>
          {/* predicted tractable (HPA) */}
          <BucketCell isPurple={buckets.includes(9)}>
            Human Protein Atlas - high confidence
          </BucketCell>
        </tr>
      </tbody>
    </table>
  );
};

const OtherModalitiesTable = ({ buckets }) => {
  const classes = useStyles();
  return (
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
          <BucketCell isPurple={buckets.includes(1)}>Phase 4</BucketCell>
          <BucketCell isPurple={buckets.includes(2)}>Phase 2 or 3</BucketCell>
          <BucketCell isPurple={buckets.includes(3)}>Phase 0 or 1</BucketCell>
        </tr>
      </tbody>
    </table>
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
