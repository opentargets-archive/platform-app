import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Typography } from '@material-ui/core';
import usePlatformApi from '../../../hooks/usePlatformApi';
import SectionItem from '../../../components/Section/SectionItem';
import Tooltip from '../../../components/Tooltip';
import { DataTable, TableDrawer } from '../../../components/Table';
import { PublicationsDrawer } from '../../../components/PublicationsDrawer';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import { dataTypesMap } from '../../../dataTypes';
import Description from './Description';
import { sentenceCase } from '../../../utils/global';
import { epmcUrl } from '../../../utils/urls';
import Link from '../../../components/Link';
import Summary from './Summary';
import EllsWrapper from '../../../components/EllsWrapper';

const REACTOME_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease.name',
    label: 'Disease / phenotype',
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
          <Link to={`/disease/${disease.id}`}>
            <EllsWrapper>{disease.name}</EllsWrapper>
          </Link>
        </Tooltip>
      );
    },
    width: '18%',
  },
  {
    id: 'pathwayName',
    label: 'Pathway',
    renderCell: ({ pathways }) => {
      if (!pathways || pathways.length === 0) {
        return naLabel;
      }
      if (pathways.length === 1) {
        return (
          <Link
            external
            to={`http://www.reactome.org/PathwayBrowser/#${pathways[0].id}`}
          >
            <EllsWrapper>{pathways[0].name}</EllsWrapper>
          </Link>
        );
      } else {
        const refs = pathways.map(p => ({
          url: `http://www.reactome.org/PathwayBrowser/#${p.id}`,
          name: p.name,
          group: 'Pathways',
        }));
        return (
          <TableDrawer entries={refs} message={`${refs.length} pathways`} />
        );
      }
    },
    width: '17%',
  },
  {
    id: 'reactionId',
    label: 'Reaction',
    renderCell: ({ reactionName, reactionId }) => (
      <Link external to={`https://identifiers.org/reactome/${reactionId}`}>
        <EllsWrapper>{reactionName}</EllsWrapper>
      </Link>
    ),
    width: '17%',
  },
  {
    id: 'targetFromSourceId',
    label: 'Reported target',
    renderCell: ({ targetFromSourceId }) => (
      <Link
        external
        to={`https://identifiers.org/uniprot/${targetFromSourceId}`}
      >
        <EllsWrapper>{targetFromSourceId}</EllsWrapper>
      </Link>
    ),
    width: '12%',
  },
  {
    id: 'targetModulation',
    label: 'Target modulation',
    renderCell: ({ targetModulation }) => {
      return targetModulation ? (
        <EllsWrapper>{sentenceCase(targetModulation)}</EllsWrapper>
      ) : (
        naLabel
      );
    },
    filterValue: ({ targetModulation }) => sentenceCase(targetModulation),
    width: '12%',
  },
  {
    filterValue: ({ variantAminoacidDescriptions }) => {
      return variantAminoacidDescriptions
        .map(variantAminoacidDescription => variantAminoacidDescription)
        .join();
    },
    label: 'Amino acid variation',
    renderCell: ({ variantAminoacidDescriptions }) => {
      return variantAminoacidDescriptions?.length > 1 ? (
        <TableDrawer
          entries={variantAminoacidDescriptions.map(d => ({
            name: d,
            group: 'Amino acid variation',
          }))}
        />
      ) : variantAminoacidDescriptions?.length === 1 ? (
        <EllsWrapper>{variantAminoacidDescriptions[0]}</EllsWrapper>
      ) : (
        naLabel
      );
    },
    width: '12%',
  },
  {
    id: 'literature',
    label: 'Literature',
    renderCell: ({ literature = [] }) => {
      const literatureList = [];
      literature?.forEach(id => {
        if (id !== 'NA') {
          literatureList.push({
            name: id,
            url: epmcUrl(id),
            group: 'literature',
          });
        }
      });
      return <PublicationsDrawer entries={literatureList} />;
    },
    width: '12%',
  },
];

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  const { data: summaryData } = usePlatformApi(
    Summary.fragments.reactomeSummary
  );

  const variables = {
    ensemblId,
    efoId,
    size: summaryData.reactomeSummary.count,
  };

  const request = useQuery(REACTOME_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.affected_pathway}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
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
            fixed
            noWrapHeader={false}
            query={REACTOME_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );
}

export default Body;
