import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { getGeneDiseaseGtexPlot } from '../../../utils/externalAPI';
import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';
import DataDownloader from '../../../components/Table/DataDownloader';
import { Grid } from '@material-ui/core';
import { dataTypesMap } from '../../../dataTypes';

import {getData} from './Summary'; 

function Body({ definition, id, label}) {
  const { ensgId: ensemblId, efoId } = id;

  const [json, setJson] = useState([])
  const [linearPlot, setLinearPlot] = useState('')
  const [log10Plot, setLog10Plot] = useState('')
  const [tab, setTab] = useState('linear');
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasData, setHasData] = useState(false)

  const handleOnChange = (_, tab) => {
    return setTab(tab);
  };


  useEffect(()=>{
    // Get JSON Data and use this data to determine if TPM plot exist or not
    getData(id, setJson, setLoading, setHasData)
  }, [ensemblId, efoId, id])
  
  useEffect(
    ()=>{
      if (hasData && tab === 'linear' && linearPlot.length === 0) {
        /********     Get Plot    ******** */ 
        setLoading(true)
        getGeneDiseaseGtexPlot(ensemblId, efoId, tab, 
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
      } else if (hasData && tab === 'log10' && log10Plot.length === 0) {
          /********     Get Plot    ******** */ 
          setLoading(true)
          getGeneDiseaseGtexPlot(ensemblId, efoId, tab,  
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
    }, [efoId, hasData, ensemblId, tab, linearPlot.length, log10Plot.length]);

  const columns = [
    { id: 'x_labels' },
    { id: 'Gene_Ensembl_ID' },
    { id: 'Gene_symbol' },
    { id: 'PMTL' },
    { id: 'Dataset' },
    { id: 'Disease' },
    { id: 'GTEx_tissue_subgroup' },
    { id: 'EFO' },
    { id: 'MONDO' },
    { id: 'GTEx_tissue_subgroup_UBERON' },
    { id: 'TPM_mean' },
    { id: 'TPM_sd' },
    { id: 'TPM_min' },
    { id: 'TPM_25th_percentile' },
    { id: 'TPM_median',},
    { id: 'TPM_75th_percentile' },
    { id: 'TPM_max' }
  ]
  return hasData ? 
     (
      <SectionItem
        definition={definition}
        chipText={dataTypesMap.rna_expression}
        request={{data: {linearPlot, log10Plot, json}, error, loading}}
        renderDescription={() => (
          <Description symbol={label.symbol} name={label.name} />
        )}
        renderBody={(data) => {
          const { json, linearPlot, log10Plot} = data
          const imageWidth = 1400
          const imageHeight = 957
          return (
            <>
              <Tabs
                value={tab}
                onChange={handleOnChange}
                style={{ marginBottom: '1rem' }}
              >
                <Tab value="linear" label="Linear" />
                <Tab value="log10" label="Log 10"/>
              </Tabs>

              {tab === 'linear' ? (
                <>
                  <Grid container>
                    <Grid item xs={12}>
                      <DataDownloader rows={json} columns={columns} fileStem={`OpenPedCan-${ensemblId}-${efoId}`}/>
                      <img src={`data:image/png;base64,${linearPlot}`}
                        width={imageWidth} height={imageHeight} alt="Linear Gene All Cancer Plot" />
                    </Grid>
                </Grid>
                </>
              ) : null}

              {tab === 'log10' ? (
                <>
                  <Grid container>
                    <Grid item xs={12}>
                      <DataDownloader rows={json} columns={columns} fileStem={`OpenPedCan-${ensemblId}-${efoId}`}/>
                      <img src={`data:image/png;base64,${log10Plot}`}
                      width={imageWidth} height={imageHeight} alt="Log10 Gene All Cancer Plot" />
                    </Grid>
                </Grid>
                </>
              ) : null}
            </>
          );
        }}
      />
    )
        : <></>
}

export default Body;
