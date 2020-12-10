import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'ot-ui';
import {
  clinvarStarMap,
  naLabel,
  defaultRowsPerPageOptions,
} from '../../../constants';
import { sentenceCase } from '../../../utils/global';
import { epmcUrl } from '../../../utils/urls';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import ClinvarStar from '../../../components/ClinvarStar';
import Tooltip from '../../../components/Tooltip';
import { Table, DataTable, getPage } from '../../../components/Table';
import { TableDrawer } from '../../../components/Table';
import { betaClient } from '../../../client';
import Description from './Description';

import Summary from './Summary';

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource }) => {
      return (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Reported disease or phenotype:
              </Typography>
              <Typography variant="caption" display="block" align="center">
                {diseaseFromSource}
              </Typography>
            </>
          }
          showHelpIcon
        >
          <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
        </Tooltip>
      );
    },
  },
  {
    id: 'variantRsId',
    label: 'Variant',
    renderCell: ({ variantRsId }) => {
      return variantRsId ? (
        <Link
          external
          to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
        >
          {variantRsId}
        </Link>
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'studyId',
    label: 'ClinVar ID',
    renderCell: ({ studyId }) => {
      return studyId ? (
        <Link external to={`https://www.ncbi.nlm.nih.gov/clinvar/${studyId}`}>
          {studyId}
        </Link>
      ) : (
        naLabel
      );
    },
  },
  {
    label: 'Functional consequence',
    renderCell: ({ variantFunctionalConsequence }) => {
      return (
        <Link
          external
          to={`http://www.sequenceontology.org/browser/current_svn/term/${
            variantFunctionalConsequence.id
          }`}
        >
          {sentenceCase(variantFunctionalConsequence.label)}
        </Link>
      );
    },
  },
  {
    id: 'clinicalSignificances',
    filterValue: ({ clinicalSignificances }) => {
      return clinicalSignificances.join();
    },
    label: 'Clinical significance',
    renderCell: ({ clinicalSignificances }) => {
      return !clinicalSignificances ? (
        naLabel
      ) : clinicalSignificances.length === 1 ? (
        clinicalSignificances[0]
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {clinicalSignificances.map(clinicalSignificance => {
            return <li key={clinicalSignificance}>{clinicalSignificance}</li>;
          })}
        </ul>
      );
    },
  },
  {
    id: 'allelicRequirements',
    label: 'Allelic requirement',
    renderCell: ({ allelicRequirements }) => {
      return !allelicRequirements ? (
        naLabel
      ) : allelicRequirements.length === 1 ? (
        allelicRequirements[0]
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {allelicRequirements.map(allelicRequirement => {
            return <li key={allelicRequirement}>{allelicRequirement}</li>;
          })}
        </ul>
      );
    },
  },
  {
    label: 'Confidence',
    renderCell: ({ confidence }) => {
      const numStars = clinvarStarMap[confidence];
      const stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(<ClinvarStar key={i} />);
      }
      return (
        <Tooltip title={confidence}>
          <span>{stars}</span>
        </Tooltip>
      );
    },
  },
  {
    label: 'Literature',
    renderCell: ({ literature }) => {
      const literatureList =
        literature?.reduce((acc, id) => {
          if (id !== 'NA') {
            acc.push({
              name: id,
              url: epmcUrl(id),
              group: 'literature',
            });
          }
          return acc;
        }, []) || [];

      return <TableDrawer entries={literatureList} caption="Literature" />;
    },
  },
];

const EVA_QUERY = gql`
  query evaQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
    $cursor: [String!]
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["eva"]
        size: $size
        cursor: $cursor
      ) {
        count
        cursor
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          variantRsId
          studyId
          variantFunctionalConsequence {
            id
            label
          }
          clinicalSignificances
          allelicRequirements
          confidence
          literature
        }
      }
    }
  }
`;

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(Summary.fragments.evaSummary);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const request = useQuery(EVA_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size:
        summaryData.evaSummary.count > 1000
          ? pageSize
          : summaryData.evaSummary.count,
    },
    notifyOnNetworkStatusChange: true,
    client: betaClient,
  });
  const { loading, data, fetchMore } = request;

  function handlePageChange(newPage) {
    if (newPage * pageSize + pageSize > data.disease.evidences.rows.length) {
      fetchMore({
        variables: {
          ensemblId,
          efoId,
          size: pageSize,
          cursor: data.disease.evidences.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setPage(newPage);
          return {
            ...prev,
            disease: {
              ...prev.disease,
              evidences: {
                ...prev.disease.evidences,
                cursor: fetchMoreResult.disease.evidences.cursor,
                rows: [
                  ...prev.disease.evidences.rows,
                  ...fetchMoreResult.disease.evidences.rows,
                ],
              },
            },
          };
        },
      });
    } else {
      setPage(newPage);
    }
  }

  function handleRowsPerPageChange(newPageSize) {
    if (newPageSize > data.disease.evidences.rows.length) {
      fetchMore({
        variables: {
          ensemblId,
          efoId,
          size: pageSize,
          cursor: data.disease.evidences.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setPage(0);
          setPageSize(newPageSize);
          return {
            ...prev,
            disease: {
              ...prev.disease,
              evidences: {
                ...prev.disease.evidences,
                cursor: fetchMoreResult.disease.evidences.cursor,
                rows: [
                  ...prev.disease.evidences.rows,
                  ...fetchMoreResult.disease.evidences.rows,
                ],
              },
            },
          };
        },
      });
    } else {
      setPage(0);
      setPageSize(newPageSize);
    }
  }

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { count, rows } = disease.evidences;

        return summaryData.evaSummary.count > 1000 ? (
          <Table
            dataDownloader
            loading={loading}
            columns={columns}
            rows={getPage(rows, page, pageSize)}
            rowCount={count}
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Body;
