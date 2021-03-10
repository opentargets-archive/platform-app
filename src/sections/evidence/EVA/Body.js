import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { gql } from '@apollo/client';

import client from '../../../client';
import ClinvarStars from '../../../components/ClinvarStars';
import {
  clinvarStarMap,
  naLabel,
  defaultRowsPerPageOptions,
} from '../../../constants';
import {
  DataTable,
  getPage,
  Table,
  TableDrawer,
} from '../../../components/Table';
import Description from './Description';
import Link from '../../../components/Link';
import { epmcUrl } from '../../../utils/urls';
import { sentenceCase } from '../../../utils/global';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import usePlatformApi from '../../../hooks/usePlatformApi';

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
    filterValue: ({ variantFunctionalConsequence }) =>
      sentenceCase(variantFunctionalConsequence.label),
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
        sentenceCase(clinicalSignificances[0])
      ) : (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {clinicalSignificances.map(clinicalSignificance => {
            return (
              <li key={clinicalSignificance}>
                {sentenceCase(clinicalSignificance)}
              </li>
            );
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
    filterValue: ({ allelicRequirements }) =>
      allelicRequirements ? allelicRequirements.join() : '',
  },
  {
    label: 'Confidence',
    renderCell: ({ confidence }) => {
      return (
        <Tooltip title={confidence}>
          <span>
            <ClinvarStars num={clinvarStarMap[confidence]} />
          </span>
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

const CLINVAR_QUERY = gql`
  query clinvarQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
    $cursor: String
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

function fetchClinvar(ensemblId, efoId, cursor, size) {
  return client.query({
    query: CLINVAR_QUERY,
    variables: {
      ensemblId,
      efoId,
      cursor,
      size,
    },
  });
}

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(Summary.fragments.evaSummary);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState('');
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    let isCurrent = true;
    fetchClinvar(
      ensemblId,
      efoId,
      cursor,
      summaryData.evaSummary.count > 1000 ? 100 : summaryData.evaSummary.count
    ).then(res => {
      console.log('res.data.disease.evidences', res.data.disease.evidences);
      const { count, cursor, rows } = res.data.disease.evidences;

      if (isCurrent) {
        setInitialLoading(false);
        setCursor(cursor);
        setCount(count);
        setRows(rows);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  function handlePageChange(newPage) {
    if (pageSize * newPage + pageSize > rows.length && cursor !== null) {
      setLoading(true);
      fetchClinvar(ensemblId, efoId, cursor, 100).then(res => {
        const { cursor, rows: newRows } = res.data.disease.evidences;
        setLoading(false);
        setCursor(cursor);
        setPage(newPage);
        setRows([...rows, ...newRows]);
      });
    } else {
      setPage(newPage);
    }
  }

  function handleRowsPerPageChange(newPageSize) {
    if (newPageSize > rows.length && cursor !== null) {
      setLoading(true);
      fetchClinvar(ensemblId, efoId, cursor, 100).then(res => {
        const { cursor, rows: newRows } = res.data.disease.evidences;
        setLoading(false);
        setCursor(cursor);
        setPage(0);
        setPageSize(newPageSize);
        setRows([...rows, ...newRows]);
      });
    } else {
      setPage(0);
      setPageSize(newPageSize);
    }
  }

  return (
    <SectionItem
      definition={definition}
      request={{ loading: initialLoading, data: rows }}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={() => {
        return summaryData.evaSummary.count > 1000 ? (
          <Table
            loading={loading}
            columns={columns}
            rows={getPage(rows, page, pageSize)}
            rowCount={count}
            page={page}
            rowsPerPageOptions={defaultRowsPerPageOptions}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        ) : (
          <div>client side server</div>
        );
      }}
    />
  );
}

export default Body;
