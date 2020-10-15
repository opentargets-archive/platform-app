import React from 'react';
import { gql } from '@apollo/client';
import _ from 'lodash';

import { Link } from 'ot-ui';

import { DataTable } from '../../../components/Table';
import Description from './Description';
import { naLabel } from '../../../constants';
import SectionItem from '../../../components/Section/SectionItem';
import useBatchQuery from '../../../hooks/useBatchQuery';

const BIOMARKERS_QUERY = gql`
  query CancerBiomarkersQuery(
    $ensgId: String!
    $index: Int! = 0
    $size: Int! = 10
  ) {
    target(ensemblId: $ensgId) {
      id

      cancerBiomarkers(page: { index: $index, size: $size }) {
        uniqueDrugs
        uniqueDiseases
        uniqueBiomarkers
        count
        rows {
          id
          associationType
          drugName
          evidenceLevel
          sources {
            link
            name
          }
          pubmedIds
          target {
            approvedSymbol
          }
          disease {
            name
            id
          }
        }
      }
    }
  }
`;

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

function Section({ definition, id: ensgId, label: approvedSymbol }) {
  const request = useBatchQuery(
    BIOMARKERS_QUERY,
    { ensgId: ensgId },
    'data.target.cancerBiomarkers'
  );

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description approvedSymbol={approvedSymbol} />}
      renderBody={data => (
        <DataTable
          showGlobalFilter
          columns={columns}
          rows={data}
          dataDownloader
          dataDownloaderFileStem={`${approvedSymbol}-cancer-biomarkers`}
        />
      )}
    />
  );
}

export default Section;
