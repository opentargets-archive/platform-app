import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import { sentenceCase } from '../../../utils/global';
import SectionItem from '../../../components/Section/SectionItem';

const geUrl = (id, approvedSymbol) =>
  `https://panelapp.genomicsengland.co.uk/panels/${id}/gene/${approvedSymbol}`;
const epmcUrl = id => `https://europepmc.org/article/MED/${id}`;

const GENOMICS_ENGLAND_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'diseaseFromSource',
    label: 'Reported Disease/phenotype',
    renderCell: ({ diseaseFromSource }) => sentenceCase(diseaseFromSource),
  },
  {
    id: 'allelicRequirement',
  },
  {
    id: 'studyId',
    label: 'Genomics England Panel',
    renderCell: ({ studyId, target: { approvedSymbol } }) =>
      studyId && approvedSymbol ? (
        <Link external to={geUrl(studyId, approvedSymbol)}>
          {studyId}
        </Link>
      ) : (
        naLabel
      ),
  },
  {
    id: 'confidence',
    numeric: true,
    sortable: true,
    renderCell: ({ confidence }) =>
      confidence ? parseFloat(confidence.toFixed(3)) : naLabel,
  },
  {
    id: 'literature',
    renderCell: ({ literature }) => {
      const literatureList =
        literature?.reduce((acc, id) => {
          if (id === 'NA') return acc;

          return [
            ...acc,
            {
              name: id,
              url: epmcUrl(id),
              group: 'literature',
            },
          ];
        }, []) || [];

      return <TableDrawer entries={literatureList} />;
    },
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const request = useQuery(GENOMICS_ENGLAND_QUERY, {
    variables: { ensemblId: ensgId, efoId },
    client: betaClient,
  });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={data => (
        <DataTable
          columns={columns}
          dataDownloader
          dataDownloaderFileStem={`otgenetics-${ensgId}-${efoId}`}
          rows={data.disease.evidences.rows}
          pageSize={10}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          showGlobalFilter
        />
      )}
    />
  );
}

export default Body;
