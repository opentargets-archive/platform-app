import React, { useState, useEffect } from 'react';
import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { Grid, Paper, Box, Typography, Button, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import NCIHeader from '../../components/NCIHeader';
import CHOPTable from '../../components/RMTLTable';
import NCIFooter from '../../components/NCIFooter';
import Link from '../../components/Link';
import { appDescription, appCanonicalUrl } from '../../constants';

import EntitySelect from './EntitySelect';
import defaultTargetOptions from './defaultTargetOptions.json'
import { GreenCheckIcon, isEmpty, inputSanitize, genericComparator } from './utils';

const PED_CAN_DATA_NAV_QUERY = loader('./PedCancerDataNav.gql')

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
    id: 'disease',
    label: 'Disease',
    renderCell: ({ EFO, disease }) => 
      <Link to={`/disease/${EFO}`}>{disease}</Link>,
    comparator: (a, b) => genericComparator(a, b, 'disease'),
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
    renderCell: ({SNV}) => SNV === "true" ? <GreenCheckIcon />: null,
    comparator: (a, b) => genericComparator(a, b, 'SNV'),
  },
  {
    id: 'CNV',
    label: 'CNV',
    renderCell: ({CNV}) => CNV === "true" ? <GreenCheckIcon />: null,
    comparator: (a, b) => genericComparator(a, b, 'CNV'),
  },
  {
    id: 'Fusion',
    label: 'Fusion',
    renderCell: ({Fusion}) => Fusion === "true" ? <GreenCheckIcon />: null,
    comparator: (a, b) => genericComparator(a, b, 'Fusion'),
  },
  {
    id: 'GeneExpression',
    label: 'Gene Expression',
    renderCell: ({GeneExpression}) => GeneExpression === "true" ? <GreenCheckIcon /> : null,
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
      disease: mapping.Disease,
      SNV: mapping.SNV + "",
      CNV: mapping.CNV + "",
      Fusion: mapping.Fusion + "",
      GeneExpression: mapping.GeneExpression + "",
    });
  });
  return rows;
}

const useStyles = makeStyles(theme => ({
  gridContainer: {
    margin: '170px 0 0 0',
    padding: '50px 50px 60px 50px',
    color: '#04599a',
    backgroundColor: "#CDE9FF",
    fontSize: '16px'
  },

  /*****          Header          *****/
  headerContainer: { 
    marginBottom: '25px'
  },
  header: {
    marginBottom: '50px',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#5c5f5e'
  },

  /*****          Search          *****/
  searchButton: {
    padding: '43px 20px',
    transition: "all 150ms ease",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3489ca",
    color: "white", 
    "&:hover": {
      color: "#3489ca"
    },
  },

  entityContainer: {
    backgroundColor: "white",
  },
  entityNameItem: {
    padding: '20px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  diseaseSelectItem: {
    paddingRight: '25px'
  },

  /*****          info          *****/
  infoContainer: {
    marginTop: '50px',
  },

  /*****          result          *****/
  result: {
    backgroundColor: "white",
    padding: "0 50px 0px 50px",
  },
  resultHeader: {
    marginTop: '50px',
    color: '#04599a',
  },
  resultTable: {
    marginTop: '50px',
    paddingBottom: "100px"
  },
  "@media (min-width: 1200px)": {
    geneSymbolSelectItem: {
      paddingRight: '25px'
    },
  },
  /*       Responsive      */
  "@media (max-width: 650px)": {
    gridContainer: {
      padding: '50px 10px 60px 10px',
    },
    headerContainer: {
      marginTop: '100px'
    },
    entityContainer: {
      minWidth: '300px'
    },
    entityNameItem: {
      paddingRight: '0px'
    },
    geneSymbolSelectItem: {
      paddingRight: '25px' 
    }
  }
}))

function CHoPPage() {

  const NUMBER_OF_TARGET = '43,880'
  const NUMBER_OF_DISEASE = 41
  const NUMBER_OF_EVIDENCE = '1,446,573'
  const appTitle = "Pediatric Cancer Data Navigation";

  // Accessing input from Target and Disease Associated Page
  let geneSymbol = '', disease = ''
  const location = useLocation()
  if (location?.state) {
    geneSymbol = location.state?.geneSymbol || ''
    disease = location.state?.disease || ''
  }

  // state for tracking input value
  const [targetInputValue, setTargetInputValue] = useState(geneSymbol || '');
  const [diseaseInputValue, setDiseaseInputValue] = useState(disease || '');

  // State to track the target and disease used to trigger API. These value will be used
  // to display result info above the Table.
  const [targetForInfo, setTargetForInfo] = useState('')
  const [diseaseForInfo, setDiseaseForInfo] = useState('')
  
  // Track when Page is first loaded. if true, API will be triggered instantly under useEffect
  const [firstLoad, setFirstLoad] = useState(!isEmpty(geneSymbol) || !isEmpty(disease))

  const [displayTable, setDisplayTable] = useState(false || geneSymbol.length !==0 || disease.length !==0)
  const [pageSize, setPageSize] = useState(25);

  const [getData, { loading, data }] = useLazyQuery(PED_CAN_DATA_NAV_QUERY, {
    variables: { disease: diseaseInputValue, geneSymbol: targetInputValue },
    onCompleted: () => {},
  });

  const [result, setResult] = useState(data || [])

  useEffect(
    () => {
      // Trigger the API if Gene Symbol or Disease is coming from Target or Disease Associated Page.
      if(firstLoad && (!isEmpty(geneSymbol) || !isEmpty(disease))){
        getData({ variables: { disease: inputSanitize(disease), 
            geneSymbol: inputSanitize(geneSymbol) } });
        setTargetForInfo(geneSymbol)
        setDiseaseInputValue(disease)
      }
    },
    [disease, firstLoad, geneSymbol, getData]
  )

  useEffect(
    () => {
      if (displayTable) {
        setResult(data || [])
      } else {
        setResult([])
      }
    },
    [data, displayTable, getData]
  );

  const isTargetEmpty = isEmpty(targetInputValue)
  const isDiseaseEmpty = isEmpty(diseaseInputValue)

  // Check if Both inputField are empty
  const inputFieldAreBothEmpty = isTargetEmpty && isDiseaseEmpty

  const classes = useStyles({inputFieldAreBothEmpty})
  
  const rowsPerPageOptions = [10, 25, 50];
  function handleRowsPerPageChange(newPageSize){
    setPageSize(newPageSize)
  };

  const handleOnClick = e => {
    if (inputFieldAreBothEmpty === false) {
      getData({ variables: { disease: inputSanitize(diseaseInputValue), 
        geneSymbol: inputSanitize(targetInputValue) } });
      setFirstLoad(false)
      setDisplayTable(true)
      setTargetForInfo(targetInputValue)
      setDiseaseForInfo(diseaseInputValue)
    }
  }

  const reformatResult = result?.length !== 0 ? getRows(result?.pedCanNav.rows || []) : []

  const resultInfoObj = () => {
    const searchOnlyForTarget = isEmpty(diseaseForInfo) && !isEmpty(targetForInfo)
    const searchOnlyForDisease = !isEmpty(diseaseForInfo) && isEmpty(targetForInfo)
    const searchForBoth = !isEmpty(diseaseForInfo) && !isEmpty(targetForInfo)

    return {
      target: searchOnlyForTarget,
      disease: searchOnlyForDisease,
      both: searchForBoth,
    } 
  }

  const resultInfo = () => {
    let res = <strong>Loading...</strong>
    resultInfoObj()
    const searchFor = resultInfoObj()
 
    if (!loading) { 
      if (reformatResult?.length !==0) {
        res = 
        <Typography component='p'>
          Found <strong>{reformatResult.length}</strong> 
          { searchFor.target ? 
              <span> Diseases with <strong>{targetForInfo}</strong> </span> : ""}
          { searchFor.disease ? <span> Targets with <strong>{diseaseForInfo}</strong> </span> : ""}
          { searchFor.both ? <span> result of <strong>{targetForInfo}</strong> in <strong>{diseaseForInfo}</strong> with </span> : ""}
          {' '}pediatric cancer evidence data. Note that  the existence of data does not necessarily indicate significance.
        </Typography>
      } else {
        res = <Typography component='p'>No results found</Typography>
      }
    }
    return res;
  }

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

      {/*     First Section (Search/Info)    */}
      <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridContainer}>
        {/*     Header   */}
        <Grid container item xs={12} className={classes.headerContainer}>
          <Grid item xs={12}>
            <Typography className={classes.header} variant="h5" align="center" component="h1" paragraph>
              Pediatric Cancer Data Navigation
            </Typography>
          </Grid>
          {/*   Sub Header  */}
          <Grid container item xs={12} direction="row" justifyContent="center" alignItems="center">
            <Grid container item alignItems="center" style={{width: '600px'}}> 
              <Grid item xs>
                <Typography component="p" align="center" paragraph className={classes.subHeader} >
                Search for a <b>Target</b>, <b>Disease</b>, or <b>both</b> to navigate our dataset 
                containing <b>{NUMBER_OF_TARGET}</b> Targets and <b>{NUMBER_OF_DISEASE}</b> Diseases 
                across <b>{NUMBER_OF_EVIDENCE}</b> Evidence Pages.
              </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*    Search    */}
        <Grid container alignItems="center" justifyContent='center' item xs={12} md={11} lg={10} xl={9}>
          {/*   Gene Symbol   */}
          <Grid container item alignItems="center" sm={5} className={classes.entityContainer}> 
            <Grid item className={classes.entityNameItem}> Gene Symbol: </Grid>
            <Grid item xs className={classes.geneSymbolSelectItem}>
              <EntitySelect inputValue={targetInputValue} setInputValue={setTargetInputValue}
                entity="target" defaultOptions={defaultTargetOptions}/>
            </Grid>
          </Grid>
          {/*   Disease   */}
          <Grid container item sm={5} alignItems="center"  className={classes.entityContainer}> 
            <Grid item className={classes.entityNameItem}> Disease: </Grid>
            <Grid item xs className={classes.diseaseSelectItem}>
              <EntitySelect entity="disease" inputValue={diseaseInputValue} setInputValue={setDiseaseInputValue} />
            </Grid>
          </Grid> 
          <Grid item >
            <Button className={classes.searchButton} onClick={handleOnClick} disabled={inputFieldAreBothEmpty}
              variant="contained" size="large"> Search </Button>
          </Grid>
        </Grid>
        <br />
        
        {/*     Result Description      */}
        <Grid container item xs={12} md={10} lg={6} className={classes.infoContainer}>
          <Grid container item alignItems="center" xs > 
            <Grid item xs>
              <Typography component="p" align='center' paragraph>
                In the resulting table:
              </Typography>
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
      
      {/*     Second Section (Result)    */}
      { displayTable ?
        <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.result}>
          {/*     Result Header     */}
          <Grid container item xs={12} md={10} lg={6} className={classes.resultHeader}>
            <Grid container item alignItems="center" xs > 
              <Grid item xs>
                {resultInfo()}
              </Grid>
            </Grid>
          </Grid>
          {/*     Result Table     */}
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
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      : null }

      <NCIFooter/>
    </div>
  )
}

export default CHoPPage;


