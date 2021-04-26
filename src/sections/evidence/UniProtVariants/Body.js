import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { identifiersOrgLink } from '../../../utils/global';
import Link from '../../../components/Link';
import Tooltip from '../../../components/Tooltip';
import SectionItem from '../../../components/Section/SectionItem';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import { epmcUrl } from '../../../utils/urls';
import Summary from './Summary';
import Description from './Description';

const UNIPROT_VARIANTS_QUERY = gql`
  query UniprotVariantsQuery(
    $ensemblId: String!
    $efoId: String!
    $size: Int!
  ) {
    disease(efoId: $efoId) {
      id
      evidences(
        ensemblIds: [$ensemblId]
        enableIndirect: true
        datasourceIds: ["uniprot_variants"]
        size: $size
      ) {
        rows {
          disease {
            id
            name
          }
          diseaseFromSource
          targetFromSourceId
          variantRsId
          confidence
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
    id: 'targetFromSourceId',
    label: 'Reported protein',
    renderCell: ({ targetFromSourceId }) => {
      return (
        <Link external to={identifiersOrgLink('uniprot', targetFromSourceId)}>
          {targetFromSourceId}
        </Link>
      );
    },
  },
  {
    id: 'variantRsId',
    label: 'Variant',
    renderCell: ({ variantRsId }) => {
      return (
        <Link external to={identifiersOrgLink('ensembl', variantRsId)}>
          {variantRsId}
        </Link>
      );
    },
  },
  {
    id: 'confidence',
    label: 'Confidence',
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

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.UniprotVariantsSummary
  );

  const request = useQuery(UNIPROT_VARIANTS_QUERY, {
    variables: {
      ensemblId,
      efoId,
      size: summaryData.uniprotVariantsSummary.count,
    },
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
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );
}

export default Body;
