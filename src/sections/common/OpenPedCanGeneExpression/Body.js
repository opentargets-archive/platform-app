import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Grid } from '@material-ui/core';

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
                    <DataDownloader rows={json} columns={columns} fileStem={fileStem}/>
                    <Grid item xs={12} style={{overflow: 'auto'}}>
                      <img src={`data:image/png;base64,${linearPlot}`}
                        width={imageWidth} height={imageHeight} alt={`${imageAlt} TPM boxplot (Linear)`} />
                    </Grid>
                </Grid>
                </>
              ) : null}

              {tab === 'log10' ? (
                <>
                  <Grid container>
                    <DataDownloader rows={json} columns={columns} fileStem={fileStem}/>
                    <Grid item xs={12} style={{overflow: 'auto'}}>
                      <img src={`data:image/png;base64,${log10Plot}`}
                      width={imageWidth} height={imageHeight} alt={`${imageAlt} TPM boxplot (Lag10)`} />
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
