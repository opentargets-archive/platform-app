import React from 'react';
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import ChipList from '../../../components/ChipList';
import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions, naLabel } from '../../../constants';
import Description from './Description';
import { epmcUrl } from '../../../utils/urls';
import Link from '../../../components/Link';
import methods from './methods';
import ScientificNotation from '../../../components/ScientificNotation';
import SectionItem from '../../../components/Section/SectionItem';
import { sentenceCase } from '../../../utils/global';
import Summary from './Summary';
import Tooltip from '../../../components/Tooltip';
import usePlatformApi from '../../../hooks/usePlatformApi';
import { dataTypesMap } from '../../../dataTypes';

const intOgenUrl = (id, approvedSymbol) =>
  `https://www.intogen.org/search?gene=${approvedSymbol}&cohort=${id}`;

const INTOGEN_QUERY = loader('./sectionQuery.gql');

const samplePercent = item =>
  (item.numberMutatedSamples / item.numberSamplesTested) * 100;

const columns = [
  {
    id: 'disease',
    label: 'Disease/phenotype',
    renderCell: ({ disease, diseaseFromSource }) => (
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
    ),
    filterValue: ({ disease, diseaseFromSource }) =>
      [disease.name, diseaseFromSource].join(),
  },
  {
    id: 'mutatedSamples',
    propertyPath: 'mutatedSamples.numberMutatedSamples',
    label: 'Mutated / Total samples',
    renderCell: ({ mutatedSamples }) => {
      return (
        <List style={{ padding: 0 }}>
          {mutatedSamples
            .sort((a, b) => samplePercent(b) - samplePercent(a))
            .map((item, i) => {
              const percent = samplePercent(item);

              return (
                <ListItem key={i} style={{ padding: '.25rem 0' }}>
                  {percent < 5
                    ? parseFloat(percent.toFixed(2)).toString()
                    : Math.round(percent)}
                  %
                  <Typography
                    variant="caption"
                    style={{ marginLeft: '.33rem' }}
                  >
                    ({item.numberMutatedSamples}/{item.numberSamplesTested})
                  </Typography>
                </ListItem>
              );
            })}
        </List>
      );
    },
  },
  {
    id: 'resourceScore',
    label: (
      <span>
        Combined <i>p</i>-value
      </span>
    ),

    tooltip: (
      <>
        Visit the{' '}
        <Link external to="https://www.intogen.org/faq">
          IntOGen FAQ
        </Link>{' '}
        for more information.
      </>
    ),
    numeric: true,
    sortable: true,
    renderCell: ({ resourceScore }) => (
      <ScientificNotation number={resourceScore} />
    ),
  },
  {
    id: 'significantDriverMethods',
    label: 'Cancer driver methods',
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
      significantDriverMethods ? (
        <ChipList
          items={significantDriverMethods.map((am, index) => ({
            label: am,
            tooltip: (methods[am] || {}).description,
          }))}
        />
      ) : (
        naLabel
      ),
    filterValue: ({ significantDriverMethods }) =>
      significantDriverMethods.map(am => am).join(),
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
    filterValue: ({ cohortShortName, cohortDescription }) =>
      `${cohortShortName} ${cohortDescription}`,
  },
];

const useStyles = makeStyles({
  roleInCancerBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  roleInCancerTitle: { marginRight: '.5rem' },
});

function Body({ definition, id: { ensgId, efoId }, label: { symbol, name } }) {
  const classes = useStyles();
  const {
    data: {
      intOgen: { count: size },
    },
  } = usePlatformApi(Summary.fragments.IntOgenSummaryFragment);

  const variables = { ensemblId: ensgId, efoId, size };

  const request = useQuery(INTOGEN_QUERY, {
    variables,
  });

  return (
    <SectionItem
      definition={definition}
      chipText={dataTypesMap.somatic_mutation}
      request={request}
      renderDescription={() => <Description symbol={symbol} name={name} />}
      renderBody={({
        disease: {
          evidences: { rows },
        },
        target: { hallmarks },
      }) => {
        const roleInCancerItems =
          hallmarks && hallmarks.attributes.length > 0
            ? hallmarks.attributes
                .filter(attribute => attribute.name === 'role in cancer')
                .map(attribute => ({
                  label: attribute.description,
                  url: epmcUrl(attribute.pmid),
                }))
            : [{ label: 'Unknown' }];

        return (
          <>
            <Box className={classes.roleInCancerBox}>
              <Typography className={classes.roleInCancerTitle}>
                <b>{symbol}</b> role in cancer:
              </Typography>
              <ChipList items={roleInCancerItems} />
            </Box>
            <DataTable
              columns={columns}
              dataDownloader
              dataDownloaderFileStem={`otgenetics-${ensgId}-${efoId}`}
              order="asc"
              rows={rows}
              sortBy="resourceScore"
              pageSize={10}
              rowsPerPageOptions={defaultRowsPerPageOptions}
              showGlobalFilter
              query={INTOGEN_QUERY.loc.source.body}
              variables={variables}
            />
          </>
        );
      }}
    />
  );
}

export default Body;
