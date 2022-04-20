import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';
import client from '../../../client';
import ClinvarStars from '../../../components/ClinvarStars';
import {
  clinvarStarMap,
  naLabel,
  defaultRowsPerPageOptions,
} from '../../../constants';
import { DataTable, getPage, Table } from '../../../components/Table';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import Description from './Description';
import Link from '../../../components/Link';
import { epmcUrl } from '../../../utils/urls';
import { sentenceCase } from '../../../utils/global';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import usePlatformApi from '../../../hooks/usePlatformApi';

import Summary from './Summary';
import { dataTypesMap } from '../../../dataTypes';

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource, cohortPhenotypes }) => {
      return (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Reported disease or phenotype:
              </Typography>
              <Typography
                variant="caption"
                display="block"
                align="center"
                gutterBottom
              >
                {diseaseFromSource}
              </Typography>

              {cohortPhenotypes?.length > 1 ? (
                <>
                  <Typography
                    variant="subtitle2"
                    display="block"
                    align="center"
                  >
                    All reported phenotypes:
                  </Typography>
                  <Typography variant="caption" display="block">
                    {cohortPhenotypes.map(cp => (
                      <div key={cp}>{cp}</div>
                    ))}
                  </Typography>
                </>
              ) : (
                ''
              )}
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
    id: 'variantId',
    label: 'Variant ID',
    renderCell: ({ variantId }) => {
      return variantId ? (
        <>
          {variantId.substring(0, 20)}
          {variantId.length > 20 ? '\u2026' : ''}
        </>
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'variantRsId',
    label: 'rsID',
    renderCell: ({ variantRsId }) => {
      return variantRsId ? (
        <>
          <Link
            external
            to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantRsId}`}
          >
            {variantRsId}
          </Link>
        </>
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'variantHgvsId',
    label: 'HGVS ID',
    renderCell: ({ variantHgvsId }) => {
      return variantHgvsId ? variantHgvsId : naLabel;
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
    label: 'Allele origin',
    renderCell: ({ alleleOrigins, allelicRequirements }) => {
      return !alleleOrigins || alleleOrigins.length === 0 ? (
        naLabel
      ) : allelicRequirements ? (
        <Tooltip
          title={
            <>
              <Typography variant="subtitle2" display="block" align="center">
                Allelic requirements:
              </Typography>
              {allelicRequirements.map(r => (
                <Typography variant="caption" key={r}>
                  {r}
                </Typography>
              ))}
            </>
          }
          showHelpIcon
        >
          {alleleOrigins.map(a => sentenceCase(a)).join('; ')}
        </Tooltip>
      ) : (
        alleleOrigins.map(a => sentenceCase(a)).join('; ')
      );
    },
    filterValue: ({ alleleOrigins }) =>
      alleleOrigins ? alleleOrigins.join() : '',
  },
  {
    id: 'confidence',
    label: 'Review status',
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

      return <PublicationsDrawer entries={literatureList} />;
    },
  },
];

const CLINVAR_QUERY = loader('./ClinvarQuery.gql');

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
  const count = summaryData.evaSummary.count; // reuse the count that was fetched in the summary query
  const [initialLoading, setInitialLoading] = useState(true); // state variable to keep track of initial loading of rows
  const [loading, setLoading] = useState(false); // state variable to keep track of loading state on page chage
  const [cursor, setCursor] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const variables = { ensemblId, efoId, size: count > 1000 ? 100 : count };

  useEffect(
    () => {
      let isCurrent = true;
      // Depending on count, make a decision for how many rows to fetch.
      // For more than 1000 rows, we want to use server side paging
      // so just fetch 100 rows for the initial page. If there's less
      // than 1000 rows, just fetch all rows at once and do client side
      // paging
      fetchClinvar(ensemblId, efoId, '', count > 1000 ? 100 : count).then(
        res => {
          const { cursor, rows } = res.data.disease.evidences;

          if (isCurrent) {
            setInitialLoading(false);
            setCursor(cursor);
            setRows(rows);
          }
        }
      );

      return () => {
        isCurrent = false;
      };
    },
    [ensemblId, efoId, count]
  );

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
      chipText={dataTypesMap.genetic_association}
      request={{ loading: initialLoading, data: rows }}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={() => {
        // depending on count, decide whether to use the server side paging
        // Table component or the client side paging DataTable component
        return count > 1000 ? (
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
          <DataTable
            showGlobalFilter
            columns={columns}
            rows={rows}
            dataDownloader
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={CLINVAR_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
