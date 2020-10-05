import React, { Fragment } from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Button, ListTooltip } from 'ot-ui';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';

import summaryData from './temp/summary.json';
import interactionsData from './temp/LRRK2_interactions.json';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

const columns = {
  intact: {
    interactions: [
      {
        id: 'targetB',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">
              Alt ID
              <br />
              Species
            </Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB}
            {/* <br />
            <Typography variant="caption">
              {row.organismB.taxon_id}
              <br />
              Human
            </Typography> */}
          </>
        ),
      },
      // {
      //   id: 'interactionScore',
      //   label: 'Score',
      // },
      {
        id: 'evidences',
        label: 'Interaction evidence',
        renderCell: row => row.sizeEvidences,
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
    ],
    evidence: [
      {
        id: 'interaction_identifier',
        label: 'Identifier',
      },
      {
        id: 'interaction',
        label: (
          <>
            Interaction
            <br />
            <Typography variant="caption">Host organism</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interaction_type_short_name}
            <br />
            <Typography variant="caption">
              {row.host_organism_scientific_name}
            </Typography>
          </>
        ),
      },
      {
        id: 'methods',
        label: 'Detection methods',
        renderCell: row => (
          <>
            <MethodIconText>A</MethodIconText>
            <MethodIconArrow />
            <MethodIconText>B</MethodIconText>
          </>
        ),
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
      {
        id: 'pubmed_id',
        label: 'Publication',
      },
    ],
  },

  signor: {
    // interactions table columns
    interactions: [
      // {
      //   id: 'targetA',
      //   label: (
      //     <>
      //       Interactor A
      //       {/* <br />
      //       <Typography variant="caption">Species (if not human)</Typography> */}
      //     </>
      //   ),
      //   renderCell: row => (
      //     <>
      //       {row.targetA}
      //       {/* {row.organismA.mnemonic.toLowerCase() !== 'human' ? (
      //         <>
      //           <br />
      //           <Typography variant="caption">
      //             Species: {row.organismA.mnemonic}
      //           </Typography>
      //         </>
      //       ) : null} */}
      //     </>
      //   ),
      // },
      {
        id: 'targetB',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">Species (if not human)</Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB}
            {/* {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismB.mnemonic}
                </Typography>
              </>
            ) : null} */}
          </>
        ),
      },
      // {
      //   id: 'role',
      //   label: (
      //     <>
      //       Biological
      //       <br />
      //       role
      //     </>
      //   ),
      //   renderCell: row => (
      //     <>
      //       <MethodIconText>A</MethodIconText>
      //       <MethodIconText>B</MethodIconText>
      //     </>
      //   ),
      // },
      {
        id: 'sizeEvidences',
        label: <>Interaction evidence</>,
        renderCell: row => row.sizeEvidences,
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
    ],

    // evidence table
    evidence: [
      {
        id: 'interaction_identifier',
        label: 'ID',
      },
      {
        id: 'interaction',
        label: (
          <>
            Interaction
            <br />
            <Typography variant="caption">Host organism</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interaction_type_short_name}
            <br />
            <Typography variant="caption">
              Organism: {row.host_organism_scientific_name}
            </Typography>
          </>
        ),
      },
      {
        id: 'methods',
        label: 'Detection methods',
        renderCell: row => (
          <>
            <MethodIconText>A</MethodIconText>
            <MethodIconArrow />
            <MethodIconText>B</MethodIconText>
          </>
        ),
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
      {
        id: 'pubmed_id',
        label: 'Publication',
      },
    ],
  },

  reactome: {
    // interactions table columns
    interactions: [
      {
        id: 'targetB',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">Species (if not human)</Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB}
            {/* {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismB.mnemonic}
                </Typography>
              </>
            ) : null} */}
          </>
        ),
      },
      {
        id: 'sizeEvidences',
        label: <>Interaction evidence</>,
        renderCell: row => row.sizeEvidences,
      },
    ],

    // evidence table
    evidence: [
      {
        id: 'interaction_identifier',
        label: 'ID',
      },
      {
        id: 'interaction',
        label: (
          <>
            Interaction
            <br />
            <Typography variant="caption">Host organism</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interaction_type_short_name}
            <br />
            <Typography variant="caption">
              Organism: {row.host_organism_scientific_name}
            </Typography>
          </>
        ),
      },
      {
        id: 'methods',
        label: 'Detection methods',
        renderCell: row => (
          <>
            <MethodIconText>A</MethodIconText>
            <MethodIconArrow />
            <MethodIconText>B</MethodIconText>
          </>
        ),
      },
      {
        id: 'pubmed_id',
        label: 'Publication',
      },
    ],
  },

  string: {
    interactions: [
      {
        id: 'partner',
        label: (
          <>
            Interactor B<br />
            <Typography variant="caption">Species (if not human)</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.partner}
            {row.organism.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organism.mnemonic}
                </Typography>
              </>
            ) : null}
          </>
        ),
      },
      {
        id: 'overallScore',
        label: 'Overall interaction score',
      },
      {
        id: 'neighbourhood',
        label: 'Neighbourhood',
      },
      {
        id: 'geneFusion',
        label: 'Gene fusion',
      },
      {
        id: 'occurance',
        label: 'Co-occurrance',
      },
      {
        id: 'expression',
        label: 'Co-expression',
      },
      {
        id: 'experiments',
        label: 'Experiments',
      },
      {
        id: 'databases',
        label: 'Databases',
      },
      {
        id: 'textMining',
        label: 'Text mining',
      },
      {
        id: 'homology',
        label: 'Homology',
      },
    ],
  },
};

const Section = ({ ensgId, symbol, data }) => {
  const [source, setSource] = React.useState('intact');
  const [evidenceId, setEvidenceId] = React.useState(0);

  const handleChange = (event, tabId) => {
    setSource(tabId);
  };

  // parse temp data
  // const tempData = {
  //   intact:
  // }

  return (
    <>
      {/* Interaction Resource */}
      <Tabs
        value={source}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {summaryData.data.map((s, i) => (
          <Tab
            label={
              <>
                <Typography variant="h6">{s.label}</Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {s.version}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {s.interactions.count} {s.interactions.label}
                </Typography>
              </>
            }
            value={s.id}
            key={i}
          />
        ))}
      </Tabs>

      <div style={{ marginTop: '30px' }}>
        {/* intact stuff */}
        {source === 'intact' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              {/* table 1: interactions */}
              <DataTable
                showGlobalFilter
                columns={columns.intact.interactions}
                rows={interactionsData.filter(
                  r => r.sourceDatabase === 'intact'
                )}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
                hover
                selected
                onRowClick={(r, i) => {
                  setEvidenceId(i);
                }}
                rowIsSelectable
              />
            </Grid>

            {/* table 2: evidence */}
            {/* <Grid item xs={12} md={7}>              
              <DataTable
                showGlobalFilter
                columns={columns.intact.evidence}
                rows={tempData.data.intact.rows[evidenceId].evidences}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
              />
            </Grid> */}
          </Grid>
        )}

        {/* signor stuff */}
        {source === 'signor' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              {/* table 1: interactions */}
              <DataTable
                showGlobalFilter
                columns={columns.signor.interactions}
                rows={interactionsData.filter(
                  r => r.sourceDatabase === 'signor'
                )}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
                hover
                selected
                onRowClick={(r, i) => {
                  setEvidenceId(i);
                }}
                rowIsSelectable
              />
            </Grid>

            {/* table 2: evidence */}
            {/* <Grid item xs={12} md={7}>              
              <DataTable
                showGlobalFilter
                columns={columns.signor.evidence}
                rows={tempData.data.signor.rows[evidenceId].evidences}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
              />
            </Grid> */}
          </Grid>
        )}

        {/* reactome stuff */}
        {source === 'reactome' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              {/* table 1: interactions */}
              <DataTable
                showGlobalFilter
                columns={columns.reactome.interactions}
                rows={interactionsData.filter(
                  r => r.sourceDatabase === 'reactome'
                )}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
                hover
                selected
                onRowClick={(r, i) => {
                  setEvidenceId(i);
                }}
                rowIsSelectable
              />
            </Grid>

            {/* table 2: evidence */}
            {/* <Grid item xs={12} md={7}>  
              <DataTable
                showGlobalFilter
                columns={columns.reactome.evidence}
                rows={tempData.data.reactome.rows[evidenceId].evidences}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
              />
            </Grid> */}
          </Grid>
        )}

        {/* string stuff */}
        {source === 'string' && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* table 1: this is the only table and will need to be a HEATMAP */}
              <DataTable
                showGlobalFilter
                columns={columns.string.interactions}
                rows={interactionsData.filter(
                  r => r.sourceDatabase === 'string'
                )}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-string`}
                hover
              />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(Section);
