import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import Link from '../../../components/Link';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Tooltip from '../../../components/Tooltip';
import SectionItem from '../../../components/Section/SectionItem';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
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
          diseaseFromSource
          targetFromSourceId
          studyId
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
    renderCell: ({ targetFromSourceId, studyId }) => {
      return (
        <Link external to={`http://www.uniprot.org/uniprot/${studyId}`}>
          {targetFromSourceId}
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

      return <PublicationsDrawer entries={literatureList} />;
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
