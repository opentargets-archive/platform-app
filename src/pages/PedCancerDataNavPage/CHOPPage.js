import React, { useState, useEffect } from 'react';
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
import { useLazyQuery } from '@apollo/client';

import useDebounce from '../../hooks/useDebounce';


const TARGET_SEARCH_QUERY = loader('../../components/Search/TargetSearchQuery.gql');
const DISEASE_SEARCH_QUERY = loader('../../components/Search/DiseaseSearchQuery.gql');

const PED_CAN_DATA_NAV_QUERY = loader('./PedCancerDataNav.gql')


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
    maxWidth: '550px', // 447px 
    borderRadius: '10px', 
    backgroundColor: '#3489ca', 
    padding: '10px', 
    border: 'solid 1px black'
  },
  entityContainer:{
    color: 'white'
  },
  inputFieldContainer: {
    backgroundColor: "white"
  },
  entityText: {
    textAlign: 'center',
    fontSize: '16px'
  }
}))

function CHoPPage() {
  //const [data, setData] = useState([]);
  const [targetInputValue, setTargetInputValue] = useState('');
  const [diseaseInputValue, setDiseaseInputValue] = useState('');
  const [pageSize, setPageSize] = useState(25);
  const [displayTable, setDisplayTable] = useState(false)

  const [getData, { loading, data }] = useLazyQuery(PED_CAN_DATA_NAV_QUERY, {
    variables: { disease: diseaseInputValue, geneSymbol: targetInputValue },
    onCompleted: () => {},
  });
  const [result, setResult] = useState(data || [])

  const debouncedTargetInputValue = useDebounce(targetInputValue, 300);
  const debouncedDiseaseInputValue = useDebounce(diseaseInputValue, 300);

  const inputFieldAreEmpty = debouncedTargetInputValue.length === 0 && debouncedDiseaseInputValue.length === 0

  const searchForTarget = debouncedTargetInputValue.length !== 0 && debouncedDiseaseInputValue.length === 0;
  const searchForDisease = debouncedDiseaseInputValue.length !== 0 && debouncedTargetInputValue.length === 0;
  const searchForBoth = debouncedTargetInputValue.length !== 0 && debouncedDiseaseInputValue.length !== 0;


  useEffect(
    () => {
      if (displayTable ) {
        getData({ variables: { disease: debouncedDiseaseInputValue.toLowerCase(), geneSymbol: debouncedTargetInputValue.toLowerCase() } });
        setResult(data || [])
      } else {
        setResult([])
      }
    },
    [  data, debouncedDiseaseInputValue, debouncedTargetInputValue, displayTable, getData]
  );

  console.log("Data: ", data, " \n\n result:", result)


  const appTitle = "Pediatric Cancer Data Navigation";

  const rowsPerPageOptions = [10, 25, 50];
  const classes = useStyles({inputFieldAreEmpty})

  function handleRowsPerPageChange(newPageSize){
    setPageSize(newPageSize)
  };

  const handleOnClick = e => {
    if (inputFieldAreEmpty === false) {
      setDisplayTable(true)
      //setData(getRows(intitalData))
    }
  }

  const reformatResult = result.length !== 0 ? getRows(result.pedCanNav.rows) : []

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
  
          <Grid container direction="row" justifyContent="center" alignItems="center" >
    
            {/*******  Target Search Box ********/}  
            <Grid className={classes.searchContainer} container item direction="row" justifyContent="center" alignItems="center" spacing={0}>
              <Grid item xs={3}  className={classes.entityContainer}> <p className={classes.entityText} > Gene symbol: </p> </Grid>
              <Grid item xs className={classes.inputFieldContainer}>
                <PedSearch searchQuery={TARGET_SEARCH_QUERY} inputValue={targetInputValue} setInputValue={setTargetInputValue}/>
              </Grid>
            </Grid>
          {/*md={10} l={1} xl={1}*/}
            <Grid item xs={1}  className={classes.spaceMaker}></Grid>

            {/*******  Disease Search Box ********/}
            <Grid className={classes.searchContainer} container item direction="row" justifyContent="center" alignItems="center" spacing={0}>
              <Grid item xs={2} className={classes.entityContainer}> <p className={classes.entityText}> Disease: </p> </Grid>
              <Grid item xs className={classes.inputFieldContainer}>
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
          { displayTable && inputFieldAreEmpty === false
            ? <>
                <Grid container>
                  <Grid item >
                  { reformatResult.length !== 0 
                    ?
                      <Typography component='p'>
                        Found <strong>{reformatResult.length}</strong> 
                        { searchForTarget ? <span> Diseases with <strong>{debouncedTargetInputValue}</strong> </span> : ""}
                        { searchForDisease ? <span> Targets with <strong>{debouncedDiseaseInputValue}</strong> </span> : ""}
                        { searchForBoth ? <span> result of <strong>{debouncedTargetInputValue}</strong> in <strong>{debouncedDiseaseInputValue}</strong> with </span> : ""}
                        {' '}pediatric cancer evidence data. Note that  the existence of data does not necessarily indicate significance.
                      </Typography>
                    : <Typography component='p'>No results found</Typography>
                  }
                  </Grid>
                </Grid> 
                
                <br/><br/>
                
                <Paper variant="outlined" elevation={0}>
                  <Box m={2}>
                    {(
                      <>
                        <CHOPTable
                          loading={loading}
                          columns={columns}
                          data={reformatResult}
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


