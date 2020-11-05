import React from 'react';
import { Chip, Tooltip } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import { Link } from 'ot-ui';

import { betaClient } from '../../../client';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import methods from './methods';
import ScientificNotation from '../../../components/ScientificNotation';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

const intOgenUrl = (id, approvedSymbol) =>
  `https://www.intogen.org/search?gene=${approvedSymbol}&cohort=${id}`;

const INTOGEN_QUERY = loader('./sectionQuery.gql');

const columns = [
  {
    id: 'disease',
    renderCell: ({ disease }) => (
      <Link to={`/disease/${disease.id}`}>{disease.name}</Link>
    ),
    filterValue: ({ disease }) => disease.name,
  },
  {
    id: 'inheritancePattern',
    propertyPath: 'variations.inheritancePattern',
    renderCell: ({ variations: { 0: { inheritancePattern } = {} } }) =>
      inheritancePattern ? inheritancePattern : naLabel,
  },
  {
    id: 'numberMutatedSamples',
    label: 'Mutated samples / Total samples',
    propertyPath: 'variations.numberMutatedSamples',
    numeric: true,
    renderCell: ({
      variations: { 0: { numberMutatedSamples, numberSamplesTested } = {} },
    }) =>
      numberMutatedSamples && numberSamplesTested ? (
        <>
          {numberMutatedSamples}/{numberSamplesTested}
        </>
      ) : (
        naLabel
      ),
  },
  {
    id: 'resourceScore',
    label: 'Study p-value',
    numeric: true,
    sortable: true,
    renderCell: ({ resourceScore }) => (
      <ScientificNotation number={resourceScore} />
    ),
  },
  {
    id: 'significantDriverMethods',
    label: 'Methods',
    tooltip: (
      <>
        The current version of the intOGen pipeline uses seven methods to
        identify cancer driver genes from somatic point mutations - HotMAPS,
        dNDScv, smRegions, CBaSE, FML, MutPanning, and CLUSTL. The pipeline also
        uses a combination of methods. For further information on the methods,
        please{' '}
        <Link to={methods.columnTooltip.url} external>
          click here
        </Link>{' '}
        visit the intOGen FAQ.
      </>
    ),
    renderCell: ({ significantDriverMethods }) =>
      significantDriverMethods
        ? significantDriverMethods.map(am => (
            <Tooltip
              title={(methods[am] || {}).description}
              placement="top"
              interactive
            >
              <Chip
                color="primary"
                label={am}
                style={{ margin: '3px 5px 3px 0' }}
              />
            </Tooltip>
          ))
        : naLabel,
  },
  {
    id: 'cohortShortName',
    label: 'Cohort Information',
    renderCell: ({
      cohortId,
      cohortShortName,
      cohortDescription,
      target: { approvedSymbol },
    }) =>
      cohortShortName && cohortDescription ? (
        <>
          <Link external to={intOgenUrl(cohortId, approvedSymbol)}>
            {cohortShortName}
          </Link>{' '}
          {cohortDescription}
        </>
      ) : (
        naLabel
      ),
  },
];

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const {
    data: {
      intOgen: { count: size },
    },
  } = usePlatformApi(Summary.fragments.IntOgenSummaryFragment);

  const request = useQuery(INTOGEN_QUERY, {
    variables: { ensemblId: ensgId, efoId, size },
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
