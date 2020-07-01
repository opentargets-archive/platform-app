import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { Link } from 'ot-ui';

import Table from '../../../common/Table/Table';
import { PaginationActionsComplete } from '../../../common/Table/TablePaginationActions';
import { label } from '../../../../utils/global';
import { naLabel } from '../../../../constants';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
const BIOMARKERS_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'id',
    label: 'Biomarker',
    width: '16%',
  },
  {
    id: 'diseases',
    label: 'Disease',
    renderCell: row =>
      row.disease ? (
        <Link
          external
          to={`https://www.targetvalidation.org/disease/${row.disease.id}`}
        >
          {label(row.disease.name)}
        </Link>
      ) : (
        <>{naLabel}</>
      ),
    width: '16%',
  },
  {
    id: 'drugName',
    label: 'Drug',
  },

  {
    id: 'associationType',
    label: 'Association',
    renderCell: row => _.capitalize(row.associationType.replace(/_/g, ' ')),
    width: '13%',
  },
  {
    id: 'evidenceLevel',
    label: 'Evidence',
    width: '13%',
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
    width: '13%',
  },

  // {
  //   id: 'references',
  //   label: 'References',
  //   filterValue: row =>
  //     row.references.map(reference => reference.source).join(' '),
  //   exportValue: row =>
  //     row.references.map(reference => reference.source).join(),
  // },
];

const Section = ({ ensgId, symbol, data }) => {
  const [rows, setRows] = useState([]);

  const getAllBiomarkers = useBatchDownloader(
    BIOMARKERS_QUERY,
    {
      ensgId: ensgId,
    },
    'data.target.cancerBiomarkers'
  );

  useEffect(() => {
    getAllBiomarkers().then(d => {
      setRows(d);
    });
  }, []);

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
