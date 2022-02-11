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
import { useLocation } from 'react-router-dom';


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

  gridContainer1: {
    margin: '170px 0 0 0',
    padding: '50px 50px 60px 50px',
    color: '#04599a',
    backgroundColor: "#CDE9FF"
  },
  /*     Header     */
  headerContainer: { 
    marginBottom: '25px'
  },
  header: {
    marginBottom: '50px',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  /*    Search    */
  searchButton: {
    padding: '43px 20px',
    transition: "all 150ms ease",
    border: "none",
    // cursor: props => props.inputFieldAreEmpty ? "notAllowed" : "pointer",
    // backgroundColor: props => props.inputFieldAreEmpty ? "" : "#3489ca",
    // color: props => props.inputFieldAreEmpty ? "#000000" : "white" 
    cursor: "pointer",
    backgroundColor: "#3489ca",
    color: "white", 
    "&:hover": {
      color: "#3489ca"
    },
  },
  searchContainer: {
    maxWidth: '550px', // 447px 
    borderRadius: '10px', 
    backgroundColor: '#3489ca', 
    padding: '10px', 
    border: 'solid 1px black'
  },
  entityContainer: {
    backgroundColor: "white",
  },
  entityItem: {
    padding: '20px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  entitySelectItem: {
    paddingRight: '25px'
  },


  /*      info    */
  infoContainer: {
    marginTop: '50px'
  },

  /*      result    */
  result: {
    backgroundColor: "white",
    padding: "0 50px 100px 50px",
  },
  resultHeader: {
    marginTop: '50px',
    color: '#04599a',
  },
  resultTable: {
    marginTop: '50px'
  },

  inputFieldContainer: {
    backgroundColor: "white"
  },
  entityText: {
    textAlign: 'center',
    fontSize: '16px'
  },
  
}))

function CHoPPage() {
  let geneSymbol = '', disease = ''
  const location = useLocation()
  if (location.state) {
    geneSymbol = location.state.geneSymbol || ''
    disease = location.state.disease || ''
  }

  const [targetInputValue, setTargetInputValue] = useState(geneSymbol || '');
  const [diseaseInputValue, setDiseaseInputValue] = useState(disease || '');
  const [displayTable, setDisplayTable] = useState(false || geneSymbol.length !==0 || disease.length !==0)
  const [pageSize, setPageSize] = useState(25);

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
  useEffect(
    () => {
      if(displayTable){
        setDisplayTable(false)
      }
    },
    [ debouncedDiseaseInputValue, debouncedTargetInputValue]
  )

  const appTitle = "Pediatric Cancer Data Navigation";

  const rowsPerPageOptions = [10, 25, 50];
  const classes = useStyles({inputFieldAreEmpty})

  function handleRowsPerPageChange(newPageSize){
    setPageSize(newPageSize)
  };

  const handleOnClick = e => {
    if (inputFieldAreEmpty === false) {
      setDisplayTable(true)
    }
  }

  const reformatResult = result.length !== 0 ? getRows(result.pedCanNav.rows) : []

  return (
    <div className={classes.page}>

      <NCIHeader/>

      <Grid container >
        <Grid item xs={12} md={11}>
          <Helmet title={appTitle}>
            <meta name="description" content={appDescription} />
            <link rel="canonical" href={appCanonicalUrl} />
          </Helmet>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridContainer1}>
        {/*     Header    */}
        <Grid item xs={12} className={classes.headerContainer}>
          <Typography className={classes.header} variant="h5" align="center" component="h1" paragraph>
            Pediatric Cancer Data Navigation
          </Typography>

          <Typography component="p" align="center" paragraph style={{color: 'black'}}>
            Search for a <b>Target</b>, <b>Disease</b>, or <b>both</b> to find pediatric cancer data within the 
            Molecular Targets Platform.
          </Typography>
        </Grid>

        {/*    Search    */}
        <Grid container alignItems="center" item xs={12} lg={8} style={{}}>
          {/*   Gene Symbol   */}
          <Grid container item alignItems="center" xs className={classes.entityContainer}> 
            <Grid item className={classes.entityItem}> Gene Symbol: </Grid>
            <Grid item xs className={classes.entitySelectItem}>
              <PedSearch entity="target" searchQuery={TARGET_SEARCH_QUERY} inputValue={targetInputValue} setInputValue={setTargetInputValue}/>
            </Grid>
          </Grid>
          {/*   Disease   */}
          <Grid container item xs alignItems="center" className={classes.entityContainer}> 
            <Grid item className={classes.entityItem}> Disease: </Grid>
            <Grid item xs className={classes.entitySelectItem}>
              <PedSearch entity="disease" searchQuery={DISEASE_SEARCH_QUERY} inputValue={diseaseInputValue} setInputValue={setDiseaseInputValue} />
            </Grid>
          </Grid> 
          <Grid item >
            {/*   disabled={inputFieldAreEmpty}   */}
            <Button className={classes.searchButton} onClick={handleOnClick} 
               variant="contained" size="large"> Search </Button>
          </Grid>
        </Grid>
        <br />
        
        {/*     Info      */}
        <Grid container item xs={12} lg={6} className={classes.infoContainer}>
          <Grid container item alignItems="center" xs > 
            <Grid item xs>
              <Typography component="p" align='center' paragraph>
                In the resulting table:
              </Typography>
              <Typography component="p" paragraph>
                <ul>
                  <li>
                    Each <b> Evidence </b> page link opens a page presenting all available data within the Molecular Targets 
                    Platform including available pediatric cancer data associating the specific target with the specific disease
                  </li>
                  <li>
                    Each <b>Gene symbol </b> page link opens a page presenting all available data within the Molecular 
                    Targets Platform including available pediatric cancer data for the specific target
                  </li>
                  <li>
                    <b> Disease </b> pages linked in this table will not contain pediatric data
                  </li>
                  <li> Refining a search will query the entire database </li>
                  <li> A maximum of 10,000 results are returned in the search results </li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={12} lg={8}>
          <Grid container item alignItems="center" xs > 
            <Grid item xs>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
      {/*     Result     */}
      <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.result}>
          {/*     Result Header     */}
        { displayTable && inputFieldAreEmpty === false ?
          <Grid container item xs={12} lg={6} className={classes.resultHeader}>
            <Grid container item alignItems="center" xs > 
              <Grid item xs>
                { loading 
                  ? 
                    <strong>Loading...</strong>
                  :
                  data?.pedCanNav?.rows?.length !==0
                    ?
                      <Typography component='p'>
                        Found <strong>{reformatResult.length}</strong> 
                        { searchForTarget ? <span> Diseases with <strong>{debouncedTargetInputValue}</strong> </span> : ""}
                        { searchForDisease ? <span> Targets with <strong>{debouncedDiseaseInputValue}</strong> </span> : ""}
                        { searchForBoth ? <span> result of <strong>{debouncedTargetInputValue}</strong> in <strong>{debouncedDiseaseInputValue}</strong> with </span> : ""}
                        {' '}pediatric cancer evidence data. Note that  the existence of data does not necessarily indicate significance.
                      </Typography>
                    : 
                      <Typography component='p'>No results found</Typography>
                }
              </Grid>
            </Grid>
          </Grid>
        : null}
        {/*     Result Table     */}
        { displayTable && inputFieldAreEmpty === false ?
          <Grid container item xs={12} lg={10} className={classes.resultTable}>
            <Grid container item alignItems="center" xs > 
              <Grid item xs>
                <Paper variant="outlined" elevation={0}>
                  <Box m={2}>
                    <CHOPTable
                      loading={loading}
                      columns={columns}
                      data={reformatResult}
                      pageSize={pageSize}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      rowsPerPageOptions={rowsPerPageOptions}
                      paginationPosition="TOP"
                      // sortBy={"geneSymbol"}
                      // order={"asc"}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        : null }
      </Grid>

      <NCIFooter/>
    </div>
  )
}
export default CHoPPage;


