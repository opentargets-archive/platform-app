import React from 'react';
import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Link from '../../../components/Link';
import Tooltip from '../../../components/Tooltip';
import SectionItem from '../../../components/Section/SectionItem';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import { epmcUrl } from '../../../utils/urls';
import Summary from './Summary';
import Description from './Description';
import { dataTypesMap } from '../../../dataTypes';

const ORPHANET_QUERY = loader('./OrphanetQuery.gql');

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
    filterValue: ({ disease, diseaseFromSource }) =>
      `${disease.name} ${disease.id} ${diseaseFromSource}`,
  },
  {
    id: 'targetFromSourceId',
    label: 'Reported protein',
    renderCell: ({ targetFromSource, targetFromSourceId }) => {
      return (
        <Link to={`/target/${targetFromSourceId}`}>{targetFromSource}</Link>
      );
    },
    filterValue: ({ targetFromSource, targetFromSourceId }) =>
      `${targetFromSource} ${targetFromSourceId}`,
  },
  {
    id: 'alleleOrigins',
    label: 'Allele origin',
    renderCell: ({ alleleOrigins }) => {
      return alleleOrigins.join('; ');
    },
    filterValue: ({ alleleOrigins }) => alleleOrigins.join('; '),
  },
  {
    id: 'confidence',
    label: 'Confidence',
    renderCell: ({ confidence }) => confidence,
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

const exportColumns = [
  {
    label: 'Disease',
    exportValue: row => row.disease.name,
  },
  {
    label: 'Disease ID',
    exportValue: row => row.disease.id,
  },
  {
    label: 'Disease from source',
    exportValue: row => row.diseaseFromSource,
  },
  {
    label: 'Target from source',
    exportValue: row => row.targetFromSource,
  },
  {
    label: 'Target from source ID',
    exportValue: row => row.targetFromSourceId,
  },
  {
    label: 'Allele origins',
    exportValue: row => row.alleleOrigins.join('; '),
  },
  {
    label: 'Confidence',
    exportValue: row => row.confidence,
  },
  {
    label: 'Publication IDs',
    exportValue: row => row.literature.join(', '),
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const {
    data: {
      orphanetSummary: { count: size },
    },
  } = usePlatformApi(Summary.fragments.OrphanetSummaryFragment);

  const variables = {
    ensemblId,
    efoId,
    size,
  };

  const request = useQuery(ORPHANET_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.genetic_association}
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
            dataDownloaderFileStem={`orphanet-${ensemblId}-${efoId}`}
            dataDownloaderColumns={exportColumns}
            showGlobalFilter
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={ORPHANET_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
