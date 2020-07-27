import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { Link } from 'ot-ui';

import DataTable from '../../../common/Table/DataTable';
import { label } from '../../../../utils/global';
import { naLabel } from '../../../../constants';

import { loader } from 'graphql.macro';
import useBatchDownloader from '../../../../hooks/useBatchDownloader';
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
        <Link to={`/disease/${row.disease.id}`}>{label(row.disease.name)}</Link>
      ) : (
        <>{naLabel}</>
      ),
    exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
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
    <DataTable
      showGlobalFilter
      columns={columns}
      rows={rows}
      dataDownloader
      dataDownloaderFileStem={`${symbol}-cancer-biomarkers`}
    />
  );
};

export default Section;
