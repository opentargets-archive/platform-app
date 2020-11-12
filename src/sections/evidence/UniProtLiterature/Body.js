import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Link } from '@material-ui/core';
import { betaClient } from '../../../client';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import { DataTable, TableDrawer } from '../../../components/Table';
import { epmcUrl } from '../../../utils/urls';
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

      return <TableDrawer entries={literatureList} />;
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
