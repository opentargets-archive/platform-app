import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Tab, Tabs } from '@material-ui/core';
import { getGeneAllCancerJSON } from '../../../utils/externalAPI';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';
import DataDownloader from '../../../components/Table/DataDownloader';
import { getDefaultValues } from '@apollo/client/utilities';
import { Grid } from '@material-ui/core';


const EXPRESSION_ATLAS_QUERY = gql`
  query expressionAtlasQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["expression_atlas"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          contrast
          confidence
          studyOverview
          log2FoldChangeValue
          resourceScore
          log2FoldChangePercentileRank
          studyId
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'Disease',
    label: 'Disease/phenotype',
  },
  {
    id: 'Experiment_ID',
    label: 'Experiment ID',
  },
  {
    id: 'Comparison_ID',
    label: 'Comparison ID',
  },
  {
    id: 'G1',
    label: 'G1',
  },
  {
    id: 'G1_N',
    label: 'G1 N',
    numeric: true,
    sortable: true,
  },
  {
    id: 'G1_Mean_TPM',
    label: 'G1 Mean TPM',
    numeric: true,
    sortable: true,
  },
  {
    id: 'G2_Mean_TPM',
    label: 'G2 Mean TPM',
    numeric: true,
    sortable: true,
  },
  {
    id: 'Base_Mean',
    label: 'Base Mean',
    numeric: true,
    sortable: true,
  },
  {
    id: 'Log2_FC',
    label: 'Log2 FC',
    numeric: true,
    sortable: true,
  },
  {
    id: 'Log2_FC_SE',
    label: 'Log2 FC SE',
    numeric: true,
    sortable: true,
  },
  {
    id: 'p-value',
    label: 'p-value',
    numeric: true,
    sortable: true,
  },
  {
    id: 'padj',
    label: 'padj',
    numeric: true,
    sortable: true,
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  console.log("ensemblId: ", ensemblId);
  console.log("efoId: ", efoId);
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.expressionAtlasSummary
  );
  const [data, setData] = useState([])
  const [tab, setTab] = useState('plot');
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // 
  useEffect(
    ()=>{
     if (tab === "plot"){
          getGeneAllCancerJSON(ensemblId,
            (data)=> {
              console.log(data)
              setData(data)
              setLoading(false)

            },
            (error)=> {
              setLoading(false)
              setError(true)
              console.log(error)
            });
      }
    }, [efoId, ensemblId, tab]);



  let request = useQuery(EXPRESSION_ATLAS_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.expressionAtlasSummary.count,
    },
  });

  // console.log('request: ', request);
  request = {
    ...request,
    ...{
      data: {
        id: 'EFO_0000270',
        disease: {
          evidences: {
            rows: [
              {
                Disease: 'Neuroblastoma type 1',
                Experiment_ID: 'KF_phs001436.v1.p1',
                Comparison_ID: 'Neuroblastoma1.24_vs_GTEx_All',
                G1: 'Neuroblastoma type 1 N=22',
                G1_N: '22',
                G2: 'GTEx all-tissue set v8 N=722',
                G2_N: '722',
                G1_Mean_TPM: '1215',
                G2_Mean_TPM: '244',
                Base_Mean: '355',
                Log2_FC: '1.3',
                Log2_FC_SE: '0.100',
                Log2_FC_Rank_Pctile: '52',
                'p-value': '0.00002',
                padj: '0.002',
              },
              {
                Disease: 'Neuroblastoma type 2',
                Experiment_ID: 'KF_phs001436.v1.p1',
                Comparison_ID: '“Neuroblastoma2_vs_GTEx_All”',
                G1: 'Neuroblastoma type 2 N=15',
                G1_N: '15',
                G2: 'GTEx all-tissue set v8 N=722',
                G2_N: '”722”',
                G1_Mean_TPM: '142”',
                G2_Mean_TPM: '355',
                Base_Mean: '455',
                Log2_FC: '2.7',
                Log2_FC_SE: '0.169',
                Log2_FC_Rank_Pctile: '87',
                'p-value': '0.0000003',
                padj: '0.00005',
              },
            ],
          },
        },
      },
      error: false,
    },
  };

  const handleOnChange = (_, tab) => {
    return setTab(tab);
  };

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
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        // console.log('Row: ', disease.evidences);
        const { rows } = disease.evidences;
        return (
          <>
            <Tabs
              value={tab}
              onChange={handleOnChange}
              style={{ marginBottom: '1rem' }}
            >
              {/* <Tab value="diseaseVsBaseline" label=" Disease vs baseline " />
               <Tab value="diseaseGrouping" label="Disease Grouping " /> */}
              <Tab value="plot" label="Plot" />
            </Tabs>

            {tab === 'diseaseVsBaseline' ? (
              <DataTable
                columns={columns}
                rows={rows}
                dataDownloader
                showGlobalFilter
                sortBy="resourceScore"
                order="asc"
              />
            ) : null}

            {tab === 'diseaseGrouping' ? (
              <DataTable
                columns={columns}
                rows={rows}
                dataDownloader
                showGlobalFilter
                sortBy="resourceScore"
                order="asc"
              />
            ) : null}

            {tab === 'plot' ? (
              <>
              <Grid container>
                <Grid item xs={12}>
                <DataDownloader rows={data} columns={columns} fileStem="data"/>
                <img src="https://openpedcan-api-qa.d3b.io/tpm/gene-disease-gtex/plot?ensemblId=ENSG00000157764&efoId=EFO_0000621" 
                  width='1600' height='900' alt="Dummy Plot" />
                </Grid>
              </Grid>
              </>
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;
