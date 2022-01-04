import React, { useState, useEffect } from 'react';
import axios from 'axios';
import View from './View';
import { initial } from 'lodash-es';
import CHOPTable from '../../components/RMTLTable';

import { Grid, Paper, Box, Typography, Button, TextField } from '@material-ui/core';
import BasePage from '../../components/BasePage';
import Link from '../../components/Link';
import PedSearch from '../../components/Search/PedSearch';

import {Check as CheckIcon, CropLandscapeOutlined} from '@material-ui/icons';

const CHoP_CONTENT_URL = "https://gl.githack.com/yizhenchen/dummy-data/-/raw/main/chopDataNavigationTable_SA_GX.json";
// const {Renderr, debouncedInputValue} = PedSearch;
// console.log("debouncedInputValue: ", debouncedInputValue)
const intitalData = [{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000174",
  "Gene_symbol": "TSPAN6",
  "Disease": "Ewing sarcoma",
  "SNV": false,
  "CNV": true,
  "Fusion": false,
  "GeneExpression": true
},
{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000220",
  "Gene_symbol": "TSPAN6",
  "Disease": "Acute Lymphoblastic Leukemia",
  "SNV": true,
  "CNV": true,
  "Fusion": false,
  "GeneExpression": true
},
{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000222",
  "Gene_symbol": "TSPAN6",
  "Disease": "Acute Myeloid Leukemia",
  "SNV": false,
  "CNV": true,
  "Fusion": false,
  "GeneExpression": true
},
{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000232",
  "Gene_symbol": "TSPAN6",
  "Disease": "Adenoma",
  "SNV": false,
  "CNV": false,
  "Fusion": false,
  "GeneExpression": true
},
{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000350",
  "Gene_symbol": "TSPAN6",
  "Disease": "Clear cell sarcoma of the kidney",
  "SNV": false,
  "CNV": false,
  "Fusion": false,
  "GeneExpression": true
},
{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000514",
  "Gene_symbol": "TSPAN6",
  "Disease": "Germinoma",
  "SNV": false,
  "CNV": false,
  "Fusion": false,
  "GeneExpression": true
},
{
  "targetFromSourceId": "ENSG00000000003",
  "diseaseFromSourceMappedId": "EFO_0000621",
  "Gene_symbol": "TSPAN6",
  "Disease": "Neuroblastoma",
  "SNV": true,
  "CNV": true,
  "Fusion": false,
  "GeneExpression": true
}]

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

function handleRowsPerPageChange(newPageSize){
  this.setState({ pageSize: newPageSize });
};

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

const pageSize = 25;
const rowsPerPageOptions = [10, 25, 50];


function CHoPPage() {
  const [data, setData] = useState(getRows(intitalData));
  const [targetInputValue, setTargetInputValue] = useState('');
  const [diseaseInputValue, setDiseaseInputValue] = useState('');

  const [searchButton, setSearchButton] = useState(false)


  console.log("targetInputValue: ", targetInputValue)
  console.log("diseaseInputValue", diseaseInputValue)

  const handleOnClick = e => {
    console.log("I am hereeeeeee")
    if (targetInputValue.length > 0 || diseaseInputValue.length > 0) {
      setSearchButton(true)
    }
  }

  return (
    <BasePage title="Pediatric Cancer Data Navigation" >
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

      <Grid container direction="row">
        <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={0} style={{maxWidth: '447px', borderRadius: '10px', backgroundColor: '#3489ca', padding: '5px', border: 'solid 1px black'}}>
        
          <Grid item style={{marginRight: '15px', color: 'white'}}>
            Target:  
          </Grid>
          <Grid item xs={10} style={{backgroundColor: 'white'}}>
            <PedSearch inputValue={targetInputValue} setInputValue={setTargetInputValue}
              />
          </Grid>
        </Grid>

        <Grid item xs={1} style={{minWidth: '50px', minHeight: '50px'}}></Grid>

        <Grid container item direction="row" justifyContent="center" alignItems="center" spacing={0} style={{maxWidth: '447px', borderRadius: '10px', backgroundColor: '#3489ca', padding: '5px', border: 'solid 1px black'}}>
        
          <Grid item style={{marginRight: '15px', color: 'white'}}>
            Disease:  
          </Grid>
          <Grid item xs={10} style={{backgroundColor: 'white'}}>
            <PedSearch inputValue={diseaseInputValue} setInputValue={setDiseaseInputValue}
             />
          </Grid>
        </Grid>
      </Grid> <br/><br/>
      <Grid container  direction="row"
      justifyContent="center"
      alignItems="center">
        <Grid item >
          <Button onClick={handleOnClick} variant="contained" style={{}} disabled={targetInputValue.length===0 && diseaseInputValue.length===0} >Search</Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item >
          <Typography variant='p'>
          Found 37 Diseases with ALKpediatric cancer evidence data. Note that  the existence of data does not necessarily indicate significance.
          </Typography>
        </Grid>
      </Grid>
     
        
      <hr />
      <br />
      {searchButton ?
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
              />
            </>
          )}
        </Box>
      </Paper>
        : <></>}
    </BasePage>
    
  )
}
export default CHoPPage;



/* function CHoPPage() {
  const [data, setData] = useState(intitalData);
 
   useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(CHoP_CONTENT_URL);
        if(result.status === 200){
            resultData = result.data;
        }
      } catch (error) {
        resultData = [];
      }
      setData(resultData);
    };
    fetchData();
  },[data.length]);

  return <View data={data} /> };*/
