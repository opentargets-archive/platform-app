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
  const [tab, setTab] = useState('diseaseVsBaseline');

  // 
  useEffect(
    ()=>{
     if (tab === "plot"){
          getGeneAllCancerJSON(ensemblId,(data)=>console.log(data));
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
              <Tab value="diseaseVsBaseline" label=" Disease vs baseline " />
              <Tab value="diseaseGrouping" label="Disease Grouping " />
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
                <DataDownloader rows={[]} columns={[]}/>
                <img src="https://i.stack.imgur.com/y9DpT.jpg" alt="Dummy Plot" />
              </>
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;
