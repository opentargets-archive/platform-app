import React from 'react';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import { DataTable } from '../../../components/Table';
import Description from './Description';
import Link from '../../../components/Link';
import { naLabel } from '../../../constants';
import SectionItem from '../../../components/Section/SectionItem';
import { TableDrawer } from '../../../components/Table';
import useBatchQuery from '../../../hooks/useBatchQuery';
import { epmcUrl } from '../../../utils/urls';

const BIOMARKERS_QUERY = loader('./CancerBiomarkers.gql');

const columns = [
  {
    id: 'biomarker',
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
    renderCell: ({ sources, pubmedIds }) => {
      const entries = [];

      sources.forEach(source => {
        entries.push({
          name: source.name,
          url: source.link,
          group: 'Sources',
        });
      });

      pubmedIds.forEach(pubmedId => {
        entries.push({
          name: pubmedId,
          url: epmcUrl(pubmedId),
          group: 'Europe PMC',
        });
      });

      return (
        <TableDrawer
          entries={entries}
          message={`${entries.length} references`}
        />
      );
    },
    exportValue: row => row.sources.map(source => source.name).join(),
  },
];

function Section({ definition, id: ensgId, label: symbol }) {
  const request = useBatchQuery(
    BIOMARKERS_QUERY,
    { ensgId: ensgId },
    'data.target.cancerBiomarkers'
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => (
        <DataTable
          showGlobalFilter
          columns={columns}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${symbol}-cancer-biomarkers`}
        />
      )}
    />
  );
}

export default Section;
