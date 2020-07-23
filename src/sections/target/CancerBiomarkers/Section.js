import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';

import { Link } from 'ot-ui';

import Table, { PaginationActionsComplete } from '../../../components/Table';
import useBatchDownloader from '../../../hooks/useBatchDownloader';
import { naLabel } from '../../../constants';

const BIOMARKERS_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'id',
    label: 'Biomarker',
  },
  {
    id: 'diseases',
    label: 'Disease',
    renderCell: row =>
      row.disease ? (
        <Link to={`/disease/${row.disease.id}`}>{row.disease.name}</Link>
      ) : (
        <>{naLabel}</>
      ),
    exportValue: row => (row.disease ? row.disease.name : naLabel),
  },
  {
    id: 'drugName',
    label: 'Drug',
  },

  {
    id: 'associationType',
    label: 'Association',
    renderCell: row => _.capitalize(row.associationType.replace(/_/g, ' ')),
  },
  {
    id: 'evidenceLevel',
    label: 'Evidence',
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: row => {
      return (
        <>
          {row.sources.map((source, i) => (
            <Link key={i} external to={source.link}>
              {source.name}
            </Link>
          ))}
        </>
      );
    },
    exportValue: row => row.sources.map(source => source.name).join(),
  },
];

const Section = ({ ensgId, symbol, data }) => {
  const [rows, setRows] = useState([]);

  const getAllBiomarkers = useBatchDownloader(
    BIOMARKERS_QUERY,
    { ensgId: ensgId },
    'data.target.cancerBiomarkers'
  );

  useEffect(
    () => {
      getAllBiomarkers().then(d => {
        setRows(d);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Table
      showGlobalFilter
      columns={columns}
      rows={rows}
      pagination={PaginationActionsComplete}
      dataDownloader
      dataDownloaderFileStem={`${symbol}-cancer-biomarkers`}
    />
  );
};

export default Section;
