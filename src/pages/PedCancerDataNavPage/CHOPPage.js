import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { Helmet } from 'react-helmet';
import { Grid, Paper, Box, Typography, Button, makeStyles } from '@material-ui/core';
import {Check as CheckIcon } from '@material-ui/icons';

import NCIHeader from '../../components/NCIHeader';
import PedSearch from '../../components/Search/PedSearch';
import CHOPTable from '../../components/RMTLTable';
import NCIFooter from '../../components/NCIFooter';
import Link from '../../components/Link';
import { appDescription, appCanonicalUrl } from '../../constants';
import DummyData from './DummyData.json'

const TARGET_SEARCH_QUERY = loader('../../components/Search/TargetSearchQuery.gql');
const DISEASE_SEARCH_QUERY = loader('../../components/Search/DiseaseSearchQuery.gql');

const intitalData = DummyData

/*
 * genericComparator: comparing row1 and row2 using the input keyName.
 * return: -1 if first string is lexicographically less than second property
 *          1 if first string is lexicographically greater than second property
 *          0 if both property are equal
 */
function genericComparator(row1, row2, keyName) {
  const a =
    typeof row1[keyName] === 'string'
      ? row1[keyName].toLowerCase()
      : row1[keyName];
  const b =
    typeof row2[keyName] === 'string'
      ? row2[keyName].toLowerCase()
      : row2[keyName];

  return a < b ? -1 : a > b ? 1 : 0;
}

const columns = [
  {
    id: 'geneSymbol',
    label: 'Gene symbol',
    renderCell: row => {
      const ensemblID = row.geneEnsemblId;
      const url = '/target/' + ensemblID;
      return ensemblID !== "Symbol_Not_Found" ? 
      ( <Link to={url}>{row.geneSymbol}</Link>):
       (<p> {row.geneSymbol} </p>)
    },
    
    comparator: (a, b) => genericComparator(a, b, 'geneSymbol'),
  },
  {
    id: 'Disease',
    label: 'Disease',
    renderCell: ({ EFO, Disease }) => 
      <Link to={`/disease/${EFO}`}>{Disease}</Link>,
    comparator: (a, b) => genericComparator(a, b, 'Disease'),
  },
  {
    id: 'geneEnsemblId',
    label: 'Evidence',
    orderable: false,
    renderCell: ({ geneEnsemblId, EFO }) => 
      <Link to={`/evidence/${geneEnsemblId}/${EFO}`} external>Evidence Page</Link>,
  },
  {
    id: 'SNV',
    label: 'SNV',
    renderCell: ({SNV}) => SNV === "true" ? <CheckIcon style={{color:"Green"}}/>: '',
    comparator: (a, b) => genericComparator(a, b, 'SNV'),
  },
  {
    id: 'CNV',
    label: 'CNV',
    renderCell: ({CNV}) => CNV === "true" ? <CheckIcon style={{color:"Green"}}/>: '',
    comparator: (a, b) => genericComparator(a, b, 'CNV'),
  },
  {
    id: 'Fusion',
    label: 'Fusion',
    renderCell: ({Fusion}) => Fusion === "true" ? <CheckIcon style={{color:"Green"}}/>: '',
    comparator: (a, b) => genericComparator(a, b, 'Fusion'),
  },
  {
    id: 'GeneExpression',
    label: 'Gene Expression',
    renderCell: ({GeneExpression}) => GeneExpression === "true" ? <CheckIcon style={{color:"Green"}}/>: '',
    comparator: (a, b) => genericComparator(a, b, 'GeneExpression'),
  },
];



function getRows(downloadData) {
  const rows = [];
  downloadData.forEach(mapping => {
    rows.push({
      geneEnsemblId: mapping.targetFromSourceId,
      EFO: mapping.diseaseFromSourceMappedId,
      geneSymbol: mapping.Gene_symbol,
      Disease: mapping.Disease,
      SNV: mapping.SNV + "",
      CNV: mapping.CNV + "",
      Fusion: mapping.Fusion + "",
      GeneExpression: mapping.GeneExpression + "",
    });
  });
  return rows;
}


const useStyles = makeStyles(theme => ({
  page: {
    background: theme.palette.grey['50'],
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    width: '100%',
  },
  gridContainer: {
    margin: '200px 0 0 0',
    padding: '24px',
    width: '100%',
    flex: '1 0 auto',
  },
  spaceMaker: {
    minWidth: '50px', 
    minHeight: '50px'
  },
  searchButton: {
    padding: "12px 24px",
    borderRadius: "8px",
    transition: "all 150ms ease",
    border: "none",
    cursor: props => props.inputFieldAreEmpty ? "notAllowed" : "pointer",
    backgroundColor: props => props.inputFieldAreEmpty ? "" : "#3489ca",
    color: props => props.inputFieldAreEmpty ? "" : "white" 
  },
  searchContainer: {
    maxWidth: '447px', 
    borderRadius: '10px', 
    backgroundColor: '#3489ca', 
    padding: '5px', 
    border: 'solid 1px black'
  },
  entityContainer:{
    marginRight: '15px',
    color: 'white'
  },
  inputFieldContainer: {
    backgroundColor: "white"
  }
  
}))

function CHoPPage() {
  const [data, setData] = useState([]);
  const [targetInputValue, setTargetInputValue] = useState('');
  const [diseaseInputValue, setDiseaseInputValue] = useState('');
  const [pageSize, setPageSize] = useState(25);
  const [displayTable, setDisplayTable] = useState(false)
  
  const appTitle = "Pediatric Cancer Data Navigation";

  const rowsPerPageOptions = [10, 25, 50];
  const inputFieldAreEmpty = targetInputValue.length === 0 && diseaseInputValue.length === 0
  const classes = useStyles({inputFieldAreEmpty})

  function handleRowsPerPageChange(newPageSize){
    setPageSize(newPageSize)
  };

  const handleOnClick = e => {
    if (inputFieldAreEmpty === false) {
      setDisplayTable(true)
      setData(getRows(intitalData))
    }
  }

  return (
    <div className={classes.page}>

    <NCIHeader/>

      <Grid container justify={'center'} spacing={3} className={classes.gridContainer} >
        <Grid item xs={12} md={11}>
          <Helmet title={appTitle}>
            <meta name="description" content={appDescription} />
            <link rel="canonical" href={appCanonicalUrl} />
          </Helmet>

          <Grid container>
            <Grid item xs>
              <Typography component="p" paragraph>
                (This page is under active development)
              </Typography>
    
              <Typography variant="h5" component="h1" paragraph>
                Pediatric Cancer Data Navigation
              </Typography>
    
              <br />
              <Typography component="p" paragraph>
                Search for a <b>Target</b>, <b>Disease</b>, or <b>both</b> to find detailed evidence pages with pediatric cancer data within the Molecular Targets Platform.
              </Typography>
            </Grid>
          
          </Grid> <br/>
  
          <Grid container direction="row" justifyContent="center" alignItems="center">
    
            {/*******  Target Search Box ********/}  
            <Grid className={classes.searchContainer} container item direction="row" justifyContent="center" alignItems="center" spacing={0}>
              <Grid item className={classes.entityContainer}>Target: </Grid>
              <Grid item xs={10} className={classes.inputFieldContainer}>
                <PedSearch searchQuery={TARGET_SEARCH_QUERY} inputValue={targetInputValue} setInputValue={setTargetInputValue}/>
              </Grid>
            </Grid>
    
            <Grid item xs={1} className={classes.spaceMaker}></Grid>
            
            {/*******  Disease Search Box ********/}
            <Grid className={classes.searchContainer} container item direction="row" justifyContent="center" alignItems="center" spacing={0}>
              <Grid item className={classes.entityContainer}> Disease: </Grid>
              <Grid item xs={10} className={classes.inputFieldContainer}>
                <PedSearch searchQuery={DISEASE_SEARCH_QUERY} inputValue={diseaseInputValue} setInputValue={setDiseaseInputValue} />
              </Grid>
            </Grid>
          </Grid> 
        
          <br/> <br/>
  
          {/*******  Search Button ********/}
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item >
              <Button className={classes.searchButton} onClick={handleOnClick} disabled={inputFieldAreEmpty} variant="contained" > Search </Button>
            </Grid>
          </Grid>
          
          <br/> <br/>
          <hr /> <br />
  
          {/*******  Result/Table ********/}
          { displayTable 
            ? <>
                <Grid container>
                  <Grid item >
                    <Typography component='p'>
                      Found <strong>7</strong> Diseases with <strong>tetraspanin 6</strong> pediatric cancer evidence data. Note that  the existence of data does not necessarily indicate significance.
                    </Typography>
                  </Grid>
                </Grid> 
                
                <br/><br/>
                
                <Paper variant="outlined" elevation={0}>
                  <Box m={2}>
                    {(
                      <>
                        <CHOPTable
                          columns={columns}
                          data={data}
                          pageSize={pageSize}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          rowsPerPageOptions={rowsPerPageOptions}
                          paginationPosition="TOP"
                          sortBy={"geneSymbol"}
                          order={"asc"}
                        />
                      </>
                    )}
                  </Box>
                </Paper>
              </>
            : <></>
          }
        </Grid>
      </Grid>

      <NCIFooter/>
    </div>
  )
}
export default CHoPPage;


