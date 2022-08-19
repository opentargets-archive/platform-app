import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Grid, makeStyles} from '@material-ui/core';
import SectionItem from '../../../components/Section/SectionItem';
import DataDownloader from '../../../components/Table/DataDownloader';
import { dataTypesMap } from '../../../dataTypes';





function Body({ definition, id, label, getData, getPlot, Description, entity, fileStem, imageAlt}) {

  const [json, setJson] = useState([]);
  const [linearPlot, setLinearPlot] = useState('')
  const [log10Plot, setLog10Plot] = useState('')
  const [tab, setTab] = useState('linear');
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasData, setHasData] = useState(false)

  const handleOnChange = (_, tab) => {
    return setTab(tab);
  };


  const useStyles = makeStyles({
  tabs: {
    
    "& .MuiTabs-indicator": {
      color: '#5ca300',
    },
    "& .MuiTab-root.Mui-selected": {
      backgroundColor: '#5ca300',
      color:'#fff'
    },
    "& .MuiTab-textColorInherit": {
      color: '#376100 ',
      "&:hover": { backgroundColor: "#bdda99",
      },
    }
  },
  image: {
     minWidth : '1200px',
     width: '100%',
     height: 'auto'
  }
})

  const classes = useStyles();

  useEffect(
    ()=>{
      const generticId = (entity === "evidence") ? [id.ensgId, id.efoId] : [id]
      if (tab === 'linear' && linearPlot.length === 0) {
        /********     Get Linear Plot    ******** */ 
        setLoading(true)
        getPlot(...generticId, tab, 
          (resData) => {
            const base64 = Buffer.from(resData).toString('base64')
            const imageSrc = base64
            setLinearPlot(imageSrc)
            setLoading(false)
          },
          (error)=> {
            setLoading(false)
            setError(true)
            console.log(error)
          });
      } else if (tab === 'log10' && log10Plot.length === 0) {
          /********     Get Log10 Plot    ******** */ 
          setLoading(true)
          getPlot(...generticId, tab,  
            (resData) => {
              const base64 = Buffer.from(resData).toString('base64')
              const imageSrc = base64
              setLog10Plot(imageSrc)
              setLoading(false)
            },
            (error)=> {
              setLoading(false)
              setError(true)
              console.log(error)
            });
      }
      return () => {
      /********     Get JSON Data    ******** */
        if (!hasData) getData(id, setJson, setLoading, setHasData);
      }
    }, [hasData, tab, linearPlot.length, log10Plot.length, id, getData, getPlot, entity]);

  const columns = [
    { id: 'x_label' },
    { id: 'Gene_Ensembl_ID' },
    { id: 'Gene_symbol' },
    { id: 'PMTL' },
    { id: 'Dataset' },
    { id: 'Disease' },
    { id: 'GTEx_tissue_subgroup', exportLabel: 'gtexTissueSubgroup' },
    { id: 'EFO' },
    { id: 'MONDO' },
    { id: 'GTEx_tissue_subgroup_UBERON', exportLabel: 'gtexTissueSubgroupUberon' },
    { id: 'TPM_mean' },
    { id: 'TPM_sd' },
    { id: 'TPM_min' },
    { id: 'TPM_25th_percentile' },
    { id: 'TPM_median',},
    { id: 'TPM_75th_percentile' },
    { id: 'TPM_max' },
    { id: 'specimen_descriptor_fill'},
    { id: 'box_sample_count'}
  ]
  return   (
      <SectionItem
        definition={definition}
        chipText={entity === "evidence" ? dataTypesMap.rna_expression : ''}
        request={{data: {linearPlot, log10Plot, json}, error, loading}}
        renderDescription={() => (
          <Description symbol={label.symbol} name={label.name} />
        )}
        renderBody={(data) => {
          const { json, linearPlot, log10Plot} = data
          return (
            <>
              <Tabs
                value={tab}
                onChange={handleOnChange}
                style={{ marginBottom: '1rem'}}
                className={classes.tabs}
              >
                <Tab value="linear" label="Linear" />
                <Tab value="log10" label="Log 10"/>
              </Tabs>

              {tab === 'linear' ? (
                <>
                  <Grid container>
                    <DataDownloader rows={json} columns={columns} fileStem={fileStem} captionLabel="Download data as"/>
                    <Grid item xs={12} style={{overflow: 'auto'}}>
                      <img src={`data:image/png;base64,${linearPlot}`}
                       className={classes.image}  alt={`${imageAlt} TPM boxplot (Linear)`} />
                    </Grid>
                </Grid>
                </>
              ) : null}

              {tab === 'log10' ? (
                <>
                  <Grid container>
                    <DataDownloader rows={json} columns={columns} fileStem={fileStem} captionLabel="Download data as"/>
                    <Grid item xs={12} style={{overflow: 'auto'}}>
                      <img  className={classes.image} src={`data:image/png;base64,${log10Plot}`}
                      alt={`${imageAlt} TPM boxplot (Lag10)`} />
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </>
          );
        }}
      />
    )
        
}

export default Body;
