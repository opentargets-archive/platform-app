import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Tab, Tabs } from '@material-ui/core';
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

    /* Follow this filter method to implement RMTL Landing page
    // filterValue: (row) => {
    //   console.log("Row: ", row)
    //   console.log("studyOverview: ", row.contrast)
    //   return row.contrast + ' ' + row.studyOverview;
    */
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

  // 
  useEffect(
    ()=>{
        function fetchData() {
        if (tab === "plot"){
          let url = 'https://openpedcan-api-qa.d3b.io/tpm/gene-disease-gtex/json?ensemblId=' + ensemblId + '&efoId=' + efoId
          url = 'https://openpedcan-api-qa.d3b.io/tpm/gene-disease-gtex/json?ensemblId=ENSG00000157764&efoId=EFO_0000621';
          const fetchObj = {
            method: 'GET',
            crossDomain:true,
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
          };
          fetch(url, fetchObj)
         .then(response => response.json())
          .then(data => {
            console.log("Response with data: ", data);
            setData(data);
          })
          .catch(error => console.log("There was error: ", error))
          
        }
      }
      fetchData()
  
    }, [efoId, ensemblId, tab])

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

  const rows = [
    {"x_labels":"Neuroblastoma (cohort = all_cohorts, N = 347)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"all_cohorts","Disease":"Neuroblastoma","GTEx_tissue_subgroup":"","EFO":"EFO_0000621","MONDO":"MONDO_0005072","GTEx_tissue_subgroup_UBERON":"","TPM_mean":25.31,"TPM_sd":13.28,"TPM_min":3.32,"TPM_25th_percentile":15.16,"TPM_median":22,"TPM_75th_percentile":34.62,"TPM_max":69.06},
    {"x_labels":"Neuroblastoma (cohort = GMKF, N = 209)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GMKF","Disease":"Neuroblastoma","GTEx_tissue_subgroup":"","EFO":"EFO_0000621","MONDO":"MONDO_0005072","GTEx_tissue_subgroup_UBERON":"","TPM_mean":32.19,"TPM_sd":12.7,"TPM_min":8.32,"TPM_25th_percentile":21.83,"TPM_median":31.12,"TPM_75th_percentile":41.14,"TPM_max":69.06},
    {"x_labels":"Neuroblastoma (cohort = TARGET, N = 149)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"TARGET","Disease":"Neuroblastoma","GTEx_tissue_subgroup":"","EFO":"EFO_0000621","MONDO":"MONDO_0005072","GTEx_tissue_subgroup_UBERON":"","TPM_mean":15.93,"TPM_sd":6.69,"TPM_min":3.32,"TPM_25th_percentile":11.27,"TPM_median":15.1,"TPM_75th_percentile":20.03,"TPM_max":37.21},
    {"x_labels":"Adipose - Subcutaneous (cohort = GTEx, N = 663)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Adipose - Subcutaneous","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002190","TPM_mean":12.82,"TPM_sd":2.87,"TPM_min":4.28,"TPM_25th_percentile":10.93,"TPM_median":12.52,"TPM_75th_percentile":14.49,"TPM_max":31.91},
    {"x_labels":"Adipose - Visceral (Omentum) (cohort = GTEx, N = 541)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Adipose - Visceral (Omentum)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0010414","TPM_mean":10.51,"TPM_sd":3.39,"TPM_min":2.39,"TPM_25th_percentile":7.84,"TPM_median":10.25,"TPM_75th_percentile":12.89,"TPM_max":24.23},
    {"x_labels":"Adrenal Gland (cohort = GTEx, N = 258)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Adrenal Gland","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002369","TPM_mean":6.08,"TPM_sd":1.32,"TPM_min":2.22,"TPM_25th_percentile":5.31,"TPM_median":6.03,"TPM_75th_percentile":6.91,"TPM_max":10.85},
    {"x_labels":"Artery - Aorta (cohort = GTEx, N = 432)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Artery - Aorta","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001496","TPM_mean":13.14,"TPM_sd":2.72,"TPM_min":5.41,"TPM_25th_percentile":11.31,"TPM_median":12.96,"TPM_75th_percentile":14.79,"TPM_max":24.63},
    {"x_labels":"Artery - Coronary (cohort = GTEx, N = 240)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Artery - Coronary","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001621","TPM_mean":12.43,"TPM_sd":3.46,"TPM_min":4.44,"TPM_25th_percentile":9.96,"TPM_median":11.8,"TPM_75th_percentile":14.15,"TPM_max":23.58},
    {"x_labels":"Artery - Tibial (cohort = GTEx, N = 663)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Artery - Tibial","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0007610","TPM_mean":16.02,"TPM_sd":3.65,"TPM_min":3.67,"TPM_25th_percentile":13.7,"TPM_median":15.83,"TPM_75th_percentile":17.99,"TPM_max":32.95},
    {"x_labels":"Bladder (cohort = GTEx, N = 21)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Bladder","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001255","TPM_mean":15.52,"TPM_sd":6.04,"TPM_min":6.36,"TPM_25th_percentile":11.79,"TPM_median":12.95,"TPM_75th_percentile":20.06,"TPM_max":29.41},
    {"x_labels":"Blood (cohort = GTEx, N = 755)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Blood","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0013756","TPM_mean":6.38,"TPM_sd":3.8,"TPM_min":0.36,"TPM_25th_percentile":3.73,"TPM_median":5.53,"TPM_75th_percentile":7.93,"TPM_max":30.85},
    {"x_labels":"Brain - Amygdala (cohort = GTEx, N = 152)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Amygdala","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001876","TPM_mean":5.09,"TPM_sd":2.49,"TPM_min":0.77,"TPM_25th_percentile":3.26,"TPM_median":4.67,"TPM_75th_percentile":6.85,"TPM_max":12.19},
    {"x_labels":"Brain - Anterior cingulate cortex (BA24) (cohort = GTEx, N = 176)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Anterior cingulate cortex (BA24)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0009835","TPM_mean":7.78,"TPM_sd":4.2,"TPM_min":1.53,"TPM_25th_percentile":4.62,"TPM_median":7.13,"TPM_75th_percentile":9.88,"TPM_max":24.3},
    {"x_labels":"Brain - Caudate (basal ganglia) (cohort = GTEx, N = 246)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Caudate (basal ganglia)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001873","TPM_mean":6.87,"TPM_sd":3.73,"TPM_min":0.77,"TPM_25th_percentile":3.89,"TPM_median":6.64,"TPM_75th_percentile":9.37,"TPM_max":22.01},
    {"x_labels":"Brain - Cerebellum (cohort = GTEx, N = 456)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Cerebellum","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002037","TPM_mean":23.77,"TPM_sd":8.18,"TPM_min":4.58,"TPM_25th_percentile":18.59,"TPM_median":23.31,"TPM_75th_percentile":28.61,"TPM_max":59.09},
    {"x_labels":"Brain - Cortex (cohort = GTEx, N = 255)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Cortex","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001870","TPM_mean":8.42,"TPM_sd":3.06,"TPM_min":1.78,"TPM_25th_percentile":6.34,"TPM_median":8.39,"TPM_75th_percentile":10.38,"TPM_max":20.64},
    {"x_labels":"Brain - Frontal Cortex (BA9) (cohort = GTEx, N = 209)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Frontal Cortex (BA9)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0009834","TPM_mean":11.8,"TPM_sd":5.24,"TPM_min":1.68,"TPM_25th_percentile":7.94,"TPM_median":11.98,"TPM_75th_percentile":15.12,"TPM_max":32.8},
    {"x_labels":"Brain - Hippocampus (cohort = GTEx, N = 197)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Hippocampus","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001954","TPM_mean":5.63,"TPM_sd":2.99,"TPM_min":0.99,"TPM_25th_percentile":3.4,"TPM_median":5.13,"TPM_75th_percentile":7.28,"TPM_max":17.57},
    {"x_labels":"Brain - Hypothalamus (cohort = GTEx, N = 202)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Hypothalamus","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001898","TPM_mean":7.08,"TPM_sd":3.92,"TPM_min":0.84,"TPM_25th_percentile":4.22,"TPM_median":6.48,"TPM_75th_percentile":9.27,"TPM_max":24.09},
    {"x_labels":"Brain - Nucleus accumbens (basal ganglia) (cohort = GTEx, N = 246)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Nucleus accumbens (basal ganglia)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001882","TPM_mean":7.97,"TPM_sd":4.44,"TPM_min":0.77,"TPM_25th_percentile":4.76,"TPM_median":7.81,"TPM_75th_percentile":10.75,"TPM_max":22.12},
    {"x_labels":"Brain - Putamen (basal ganglia) (cohort = GTEx, N = 205)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Putamen (basal ganglia)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001874","TPM_mean":5.57,"TPM_sd":3.36,"TPM_min":0.77,"TPM_25th_percentile":3.04,"TPM_median":5.08,"TPM_75th_percentile":7.41,"TPM_max":21.08},
    {"x_labels":"Brain - Spinal cord (cervical c-1) (cohort = GTEx, N = 159)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Spinal cord (cervical c-1)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0006469","TPM_mean":5.98,"TPM_sd":2.58,"TPM_min":1.09,"TPM_25th_percentile":4.28,"TPM_median":5.81,"TPM_75th_percentile":7.48,"TPM_max":14.2},
    {"x_labels":"Brain - Substantia nigra (cohort = GTEx, N = 139)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Brain - Substantia nigra","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002038","TPM_mean":4.69,"TPM_sd":2.36,"TPM_min":1.07,"TPM_25th_percentile":2.9,"TPM_median":4.31,"TPM_75th_percentile":6.11,"TPM_max":12.65},
    {"x_labels":"Breast - Mammary Tissue (cohort = GTEx, N = 459)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Breast - Mammary Tissue","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0008367","TPM_mean":13.52,"TPM_sd":4.74,"TPM_min":4.38,"TPM_25th_percentile":9.63,"TPM_median":12.91,"TPM_75th_percentile":16.74,"TPM_max":28.59},
    {"x_labels":"Cells - Cultured fibroblasts (cohort = GTEx, N = 504)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Cells - Cultured fibroblasts","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"","TPM_mean":11.05,"TPM_sd":2.77,"TPM_min":4.75,"TPM_25th_percentile":9.36,"TPM_median":10.52,"TPM_75th_percentile":11.93,"TPM_max":23.14},
    {"x_labels":"Cells - EBV-transformed lymphocytes (cohort = GTEx, N = 174)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Cells - EBV-transformed lymphocytes","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"","TPM_mean":16.82,"TPM_sd":5.02,"TPM_min":6.68,"TPM_25th_percentile":13.51,"TPM_median":16.31,"TPM_75th_percentile":19.28,"TPM_max":40.77},
    {"x_labels":"Cervix - Ectocervix (cohort = GTEx, N = 9)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Cervix - Ectocervix","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0012249","TPM_mean":14.89,"TPM_sd":4.3,"TPM_min":8.52,"TPM_25th_percentile":12.25,"TPM_median":14.82,"TPM_75th_percentile":16.37,"TPM_max":23.71},
    {"x_labels":"Cervix - Endocervix (cohort = GTEx, N = 10)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Cervix - Endocervix","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000458","TPM_mean":16.39,"TPM_sd":2.95,"TPM_min":12.68,"TPM_25th_percentile":14.5,"TPM_median":15.54,"TPM_75th_percentile":18.15,"TPM_max":21.4},
    {"x_labels":"Colon - Sigmoid (cohort = GTEx, N = 373)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Colon - Sigmoid","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001159","TPM_mean":12.52,"TPM_sd":2.95,"TPM_min":2.89,"TPM_25th_percentile":10.76,"TPM_median":12.66,"TPM_75th_percentile":14.22,"TPM_max":23.28},
    {"x_labels":"Colon - Transverse (cohort = GTEx, N = 406)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Colon - Transverse","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001157","TPM_mean":8.88,"TPM_sd":3.67,"TPM_min":3.13,"TPM_25th_percentile":5.87,"TPM_median":7.91,"TPM_75th_percentile":11.19,"TPM_max":21.44},
    {"x_labels":"Esophagus - Gastroesophageal Junction (cohort = GTEx, N = 375)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Esophagus - Gastroesophageal Junction","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0004550","TPM_mean":12.04,"TPM_sd":3.04,"TPM_min":4.02,"TPM_25th_percentile":10,"TPM_median":11.75,"TPM_75th_percentile":13.82,"TPM_max":24.94},
    {"x_labels":"Esophagus - Mucosa (cohort = GTEx, N = 555)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Esophagus - Mucosa","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0006920","TPM_mean":7.66,"TPM_sd":1.85,"TPM_min":2.77,"TPM_25th_percentile":6.44,"TPM_median":7.44,"TPM_75th_percentile":8.71,"TPM_max":18.73},
    {"x_labels":"Esophagus - Muscularis (cohort = GTEx, N = 515)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Esophagus - Muscularis","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0004648","TPM_mean":12.05,"TPM_sd":2.77,"TPM_min":4.53,"TPM_25th_percentile":10.2,"TPM_median":11.93,"TPM_75th_percentile":13.83,"TPM_max":23.34},
    {"x_labels":"Fallopian Tube (cohort = GTEx, N = 9)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Fallopian Tube","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0003889","TPM_mean":14.97,"TPM_sd":3.73,"TPM_min":8.41,"TPM_25th_percentile":12.7,"TPM_median":16.7,"TPM_75th_percentile":16.96,"TPM_max":19.98},
    {"x_labels":"Heart - Atrial Appendage (cohort = GTEx, N = 429)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Heart - Atrial Appendage","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0006631","TPM_mean":5.31,"TPM_sd":1.75,"TPM_min":1.05,"TPM_25th_percentile":4.12,"TPM_median":5.05,"TPM_75th_percentile":6.36,"TPM_max":11.83},
    {"x_labels":"Heart - Left Ventricle (cohort = GTEx, N = 432)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Heart - Left Ventricle","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0006566","TPM_mean":3.35,"TPM_sd":1.66,"TPM_min":0.52,"TPM_25th_percentile":2.43,"TPM_median":3.31,"TPM_75th_percentile":4.13,"TPM_max":14.39},
    {"x_labels":"Kidney - Cortex (cohort = GTEx, N = 85)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Kidney - Cortex","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001225","TPM_mean":6.67,"TPM_sd":4.04,"TPM_min":2.38,"TPM_25th_percentile":4.05,"TPM_median":5.39,"TPM_75th_percentile":7.58,"TPM_max":23},
    {"x_labels":"Kidney - Medulla (cohort = GTEx, N = 4)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Kidney - Medulla","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001293","TPM_mean":8.9,"TPM_sd":3.06,"TPM_min":5.3,"TPM_25th_percentile":6.99,"TPM_median":9.12,"TPM_75th_percentile":11.04,"TPM_max":12.07},
    {"x_labels":"Liver (cohort = GTEx, N = 226)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Liver","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001114","TPM_mean":3.63,"TPM_sd":0.95,"TPM_min":1.15,"TPM_25th_percentile":2.97,"TPM_median":3.53,"TPM_75th_percentile":4.22,"TPM_max":7.74},
    {"x_labels":"Lung (cohort = GTEx, N = 578)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Lung","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0008952","TPM_mean":16.39,"TPM_sd":4.91,"TPM_min":6.11,"TPM_25th_percentile":12.79,"TPM_median":15.59,"TPM_75th_percentile":18.8,"TPM_max":37.04},
    {"x_labels":"Minor Salivary Gland (cohort = GTEx, N = 162)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Minor Salivary Gland","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0006330","TPM_mean":8.57,"TPM_sd":2.06,"TPM_min":3.73,"TPM_25th_percentile":7.14,"TPM_median":8.49,"TPM_75th_percentile":9.87,"TPM_max":14.97},
    {"x_labels":"Muscle - Skeletal (cohort = GTEx, N = 803)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Muscle - Skeletal","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0011907","TPM_mean":4.85,"TPM_sd":1.84,"TPM_min":1,"TPM_25th_percentile":3.56,"TPM_median":4.56,"TPM_75th_percentile":5.74,"TPM_max":14.81},
    {"x_labels":"Nerve - Tibial (cohort = GTEx, N = 619)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Nerve - Tibial","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001323","TPM_mean":16.83,"TPM_sd":3.21,"TPM_min":8.21,"TPM_25th_percentile":14.73,"TPM_median":16.65,"TPM_75th_percentile":18.47,"TPM_max":46.67},
    {"x_labels":"Ovary (cohort = GTEx, N = 180)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Ovary","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000992","TPM_mean":17.3,"TPM_sd":3.94,"TPM_min":8.23,"TPM_25th_percentile":14.5,"TPM_median":16.94,"TPM_75th_percentile":19.15,"TPM_max":32.61},
    {"x_labels":"Pancreas (cohort = GTEx, N = 328)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Pancreas","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001150","TPM_mean":4.44,"TPM_sd":1.49,"TPM_min":1.83,"TPM_25th_percentile":3.43,"TPM_median":4.19,"TPM_75th_percentile":5.08,"TPM_max":15.2},
    {"x_labels":"Pituitary (cohort = GTEx, N = 283)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Pituitary","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000007","TPM_mean":15.06,"TPM_sd":3.21,"TPM_min":6.49,"TPM_25th_percentile":13.16,"TPM_median":14.88,"TPM_75th_percentile":16.56,"TPM_max":27.8},
    {"x_labels":"Prostate (cohort = GTEx, N = 245)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Prostate","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002367","TPM_mean":13.59,"TPM_sd":3.43,"TPM_min":5.21,"TPM_25th_percentile":10.97,"TPM_median":13.49,"TPM_75th_percentile":15.78,"TPM_max":26.64},
    {"x_labels":"Skin - Not Sun Exposed (Suprapubic) (cohort = GTEx, N = 604)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Skin - Not Sun Exposed (Suprapubic)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0036149","TPM_mean":13.63,"TPM_sd":3.14,"TPM_min":5.81,"TPM_25th_percentile":11.49,"TPM_median":13.68,"TPM_75th_percentile":15.46,"TPM_max":28.18},
    {"x_labels":"Skin - Sun Exposed (Lower leg) (cohort = GTEx, N = 701)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Skin - Sun Exposed (Lower leg)","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0004264","TPM_mean":14.29,"TPM_sd":3.23,"TPM_min":5.23,"TPM_25th_percentile":12.1,"TPM_median":14.05,"TPM_75th_percentile":16.32,"TPM_max":25.49},
    {"x_labels":"Small Intestine - Terminal Ileum (cohort = GTEx, N = 187)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Small Intestine - Terminal Ileum","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0001211","TPM_mean":9.85,"TPM_sd":4.2,"TPM_min":3.46,"TPM_25th_percentile":6.53,"TPM_median":8.97,"TPM_75th_percentile":11.98,"TPM_max":25.59},
    {"x_labels":"Spleen (cohort = GTEx, N = 241)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Spleen","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002106","TPM_mean":10.3,"TPM_sd":3.13,"TPM_min":3.4,"TPM_25th_percentile":8.18,"TPM_median":9.55,"TPM_75th_percentile":11.69,"TPM_max":20.61},
    {"x_labels":"Stomach (cohort = GTEx, N = 359)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Stomach","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000945","TPM_mean":8.41,"TPM_sd":3.06,"TPM_min":3.57,"TPM_25th_percentile":6.25,"TPM_median":7.64,"TPM_75th_percentile":10.02,"TPM_max":21.83},
    {"x_labels":"Testis (cohort = GTEx, N = 361)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Testis","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000473","TPM_mean":20.57,"TPM_sd":3.47,"TPM_min":13.28,"TPM_25th_percentile":17.95,"TPM_median":20.28,"TPM_75th_percentile":22.95,"TPM_max":30.33},
    {"x_labels":"Thyroid (cohort = GTEx, N = 653)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Thyroid","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0002046","TPM_mean":18.4,"TPM_sd":4.17,"TPM_min":4.99,"TPM_25th_percentile":15.65,"TPM_median":17.94,"TPM_75th_percentile":20.71,"TPM_max":37.77},
    {"x_labels":"Uterus (cohort = GTEx, N = 142)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Uterus","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000995","TPM_mean":17.86,"TPM_sd":4.4,"TPM_min":10.39,"TPM_25th_percentile":14.66,"TPM_median":17.04,"TPM_75th_percentile":21,"TPM_max":37.98},
    {"x_labels":"Vagina (cohort = GTEx, N = 156)","Gene_Ensembl_ID":"ENSG00000157764","Gene_symbol":"BRAF","PMTL":"Relevant Molecular Target (RMTL version 1.0)","cohort":"GTEx","Disease":"","GTEx_tissue_subgroup":"Vagina","EFO":"","MONDO":"","GTEx_tissue_subgroup_UBERON":"UBERON_0000996","TPM_mean":13.63,"TPM_sd":3.72,"TPM_min":6.02,"TPM_25th_percentile":10.65,"TPM_median":13.57,"TPM_75th_percentile":16.66,"TPM_max":22.92}]
  

  const columns = [
    {"id": "x_labels"}, 
    {"id": "Gene_Ensembl_ID"}, 
    {"id": "Gene_symbol"},
    {"id": "PMTL"},
    {"id": "cohort"},
    {"id": "Disease"},
    {"id": "GTEx_tissue_subgroup"},
    {"id": "EFO"},
    {"id": "MONDO"},
    {"id": "GTEx_tissue_subgroup_UBERON"},
    {"id": "TPM_mean"},
    {"id": "TPM_sd"},
    {"id": "TPM_min"},
    {"id": "TPM_25th_percentile"},
    {"id": "TPM_median"},
    {"id": "TPM_75th_percentile"},
    {"id": "TPM_max"}
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
                <DataDownloader rows={rows} columns={columns} fileStem="data"/>

                <img src="https://openpedcan-api-qa.d3b.io/tpm/gene-disease-gtex/plot?ensemblId=ENSG00000157764&efoId=EFO_0000621" width='1600' height='900' alt="Dummy Plot" />
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
