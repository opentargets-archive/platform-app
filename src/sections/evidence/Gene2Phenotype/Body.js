import React from 'react';
import { List, ListItem, Typography } from '@material-ui/core';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import { epmcUrl } from '../../../utils/urls';
import { dataTypesMap } from '../../../dataTypes';
import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import { sentenceCase } from '../../../utils/global';
import Tooltip from '../../../components/Tooltip';

const g2pUrl = (studyId, symbol) =>
  `https://www.ebi.ac.uk/gene2phenotype/search?panel=${studyId}&search_term=${symbol}`;

const OPEN_TARGETS_GENETICS_QUERY = loader('./sectionQuery.gql');

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
                {sentenceCase(diseaseFromSource)}
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
    id: 'allelicRequirements',
    label: 'Allelic requirement',
    renderCell: ({ allelicRequirements }) =>
      allelicRequirements ? (
        allelicRequirements.length > 1 ? (
          <List>
            {allelicRequirements.map(item => (
              <ListItem>{item}</ListItem>
            ))}
          </List>
        ) : (
          sentenceCase(allelicRequirements[0])
        )
      ) : (
        naLabel
      ),
    filterValue: ({ allelicRequirements }) => allelicRequirements.join(),
  },
  {
    id: 'studyId',
    label: 'Panel',
    renderCell: ({ studyId, target: { approvedSymbol } }) => (
      <Link external to={g2pUrl(studyId, approvedSymbol)}>
        {studyId}
      </Link>
    ),
  },
  {
    id: 'confidence',
    label: 'Confidence category',
    renderCell: ({ confidence }) =>
      confidence ? (
        <Tooltip
          title={
            <>
              <Typography variant="caption" display="block" align="center">
                As defined by the{' '}
                <Link
                  external
                  to={`https://thegencc.org/faq.html#validity-termsdelphi-survey`}
                >
                  GenCC Guidelines
                </Link>
              </Typography>
            </>
          }
          showHelpIcon
        >
          {sentenceCase(confidence)}
        </Tooltip>
      ) : (
        naLabel
      ),
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
  const variables = { ensemblId: ensgId, efoId };

  const request = useQuery(OPEN_TARGETS_GENETICS_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.genetic_association}
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
          query={OPEN_TARGETS_GENETICS_QUERY.loc.source.body}
          variables={variables}
        />
      )}
    />
  );
}

export default Body;
