import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Summary from './Summary';
import Description from './Description';

const UNIPROT_LITERATURE_QUERY = gql`
  query UniprotLiteratureQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["uniprot_literature"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          target {
            proteinAnnotations {
              id
            }
          }
          literature
        }
      }
    }
  }
`;

const columns = [
  {
    id: 'disease.name',
    label: 'Disease/phenotype',
    renderCell: ({ disease }) => {
      return (
        <Link component={RouterLink} to={`/disease/${disease.id}`}>
          {disease.name}
        </Link>
      );
    },
  },
  {
    id: 'target.proteinAnnotations.id',
    label: 'Uniprot - Pathology & Biotech',
    renderCell: ({ target }) => {
      return (
        <Link
          href={`http://www.uniprot.org/uniprot/${
            target.proteinAnnotations.id
          }#pathology_and_biotech`}
        >
          {target.proteinAnnotations.id}
        </Link>
      );
    },
  },
  {
    label: 'Literature',
    renderCell: ({ literature }) => {
      const queryString = literature
        .map(lit => {
          return `EXT_ID:${lit}`;
        })
        .join(' OR ');
      return (
        <Link href={`https://europepmc.org/search?query=${queryString}`}>
          {literature.length} publication{literature.length > 1 ? 's' : null}
        </Link>
      );
    },
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.UniprotLiteratureSummary
  );

  const request = useQuery(UNIPROT_LITERATURE_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.uniprotLiteratureSummary.count,
    },
    client: betaClient,
  });
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} diseaseName={label.name} />
      )}
      renderBody={({ disease }) => {
        const { rows } = disease.evidences;
        return (
          <DataTable
            columns={columns}
            rows={rows}
            dataDownloader
            showGlobalFilter
          />
        );
      }}
    />
  );
}

export default Body;
