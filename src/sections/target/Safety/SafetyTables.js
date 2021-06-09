import React from 'react';
import _ from 'lodash';
import { Typography, Divider, Box } from '@material-ui/core';

import Link from '../../../components/Link';
import DataTable from '../../../components/Table/DataTable';

const SafetyTables = ({ symbol, data }) => {
  const { adverseEffects, safetyRiskInfo, tox21, etox } = data;
  const hasEffects = adverseEffects.length > 0,
    hasRiskInfo = safetyRiskInfo.length > 0,
    hasTox21 = tox21.length > 0,
    hasEtox = etox.length > 0;
  return (
    <>
      {hasEffects && (
        <>
          <Typography variant="h6">Known safety effects</Typography>
          <DataTable
            columns={effectsColumns}
            dataDownloader
            dataDownloaderFileStem={`${symbol}-safety-effects`}
            rows={adverseEffects}
            showGlobalFilter
            noWrap={false}
          />
        </>
      )}
      {hasRiskInfo && (
        <>
          <Typography variant="h6">Safety risk information</Typography>
          <DataTable
            columns={riskColumns}
            dataDownloader
            dataDownloaderFileStem={`${symbol}-risk-information`}
            rows={safetyRiskInfo}
            showGlobalFilter
            noWrap={false}
          />
        </>
      )}
      {(hasTox21 || hasEtox) && (
        <>
          <Typography variant="h6">
            Non-clinical experimental toxicity
          </Typography>
          <Typography variant="body2">
            Details of assays that can be used to test for {symbol} toxicity in
            vitro.
          </Typography>
          <SeparatedByDividers>
            {hasTox21 && (
              <DataTable
                columns={tox21Columns}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-tox21`}
                rows={tox21}
                showGlobalFilter
                noWrap={false}
              />
            )}
            {hasEtox && (
              <DataTable
                columns={etoxColumns}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-etox`}
                rows={etox}
                showGlobalFilter
                noWrap={false}
              />
            )}
          </SeparatedByDividers>
        </>
      )}
    </>
  );
};

const SeparatedByDividers = ({ children }) => {
  let numPreviousChildren = 0;
  return (
    <>
      {React.Children.map(children, child => (
        <>
          {child !== null && numPreviousChildren++ > 0 && (
            <Box my={1}>
              <Divider />
            </Box>
          )}
          {child}
        </>
      ))}
    </>
  );
};

const effectsColumns = [
  {
    id: 'organs_systems_affected',
    label: 'Main organs & systems affected',
    renderCell: ({ organsSystemsAffected }) => (
      <ul>
        {organsSystemsAffected
          .filter(organ => organ.code)
          .map(organ => (
            <li key={organ.code}>{organ.mappedTerm}</li>
          ))}
      </ul>
    ),
    exportValue: row =>
      row.organsSystemsAffected.map(organ => organ.preferredTerm).join(', '),
    filterValue: row =>
      row.organsSystemsAffected.map(organ => organ.preferredTerm).join(', '),
  },
  {
    id: 'activation_effects',
    label: 'Agonism or activation effects',
    renderCell: ({ activationEffects }) =>
      activationEffects.map(({ groupKey, terms }) => (
        <React.Fragment key={groupKey}>
          <Typography variant="subtitle2">
            {_.capitalize(_.lowerCase(groupKey))}
          </Typography>
          <ul>
            {terms.map(term => (
              <li key={`${groupKey}:${term}`}>{term}</li>
            ))}
          </ul>
        </React.Fragment>
      )),
    exportValue: row =>
      _.flatMap(row.activationEffects, ({ terms }) => terms).join(', '),
    filterValue: row =>
      _.flatMap(row.activationEffects, ({ terms }) => terms).join(', '),
  },
  {
    id: 'inhibition_effects',
    label: 'Antagonism or inhibition effects',
    renderCell: ({ inhibitionEffects }) =>
      inhibitionEffects.map(({ groupKey, terms }) => (
        <React.Fragment key={groupKey}>
          <Typography variant="subtitle2">
            {_.capitalize(_.lowerCase(groupKey))}
          </Typography>
          <ul>
            {terms.map(term => (
              <li key={`${groupKey}:${term}`}>{term}</li>
            ))}
          </ul>
        </React.Fragment>
      )),
    exportValue: row =>
      _.flatMap(row.inhibitionEffects, ({ terms }) => terms).join(', '),
    filterValue: row =>
      _.flatMap(row.inhibitionEffects, ({ terms }) => terms).join(', '),
  },
  {
    id: 'references',
    label: 'Publications',
    renderCell: ({ references }) => (
      <ReferencesCell>{references}</ReferencesCell>
    ),
    exportValue: row => row.references.map(ref => ref.pubUrl).join(', '),
    filterValue: false,
  },
];

const riskColumns = [
  {
    id: 'organs_systems_affected',
    label: 'Main organs & systems affected',
    renderCell: ({ organsSystemsAffected }) => (
      <ul>
        {organsSystemsAffected
          .filter(organ => organ.code)
          .map(organ => (
            <li key={organ.code}>{organ.preferredTerm}</li>
          ))}
      </ul>
    ),
    exportValue: row =>
      row.organsSystemsAffected.map(organ => organ.preferredTerm).join(', '),
    filterValue: row =>
      row.organsSystemsAffected.map(organ => organ.preferredTerm).join(', '),
  },
  {
    id: 'safety_liability',
    label: 'Safety liability information',
    renderCell: ({ safetyLiability }) => safetyLiability,
    exportValue: row => row.safetyLiability,
    filterValue: row => row.safetyLiability,
  },
  {
    id: 'references',
    label: 'Publications',
    renderCell: ({ references }) => (
      <ReferencesCell>{references}</ReferencesCell>
    ),
    exportValue: row => row.references.map(ref => ref.pubUrl).join(', '),
    filterValue: false,
  },
];

const tox21Columns = [
  { id: 'assayFormat', label: 'Assay format' },
  { id: 'assayDescription', label: 'Assay description' },
  { id: 'cellName', label: 'Cell name' },
  { id: 'assayType', label: 'Assay type' },
  {
    id: 'sourceUrl',
    label: 'Source',
    renderCell: ({ sourceName, sourceUrl }) => (
      <Link external to={sourceUrl}>
        {sourceName}
      </Link>
    ),
    filterValue: false,
  },
];

const etoxColumns = [
  { id: 'tissue', label: 'Tissue' },
  { id: 'assayDescription', label: 'Assay description' },
  { id: 'assayFormat', label: 'Assay format' },
  { id: 'assayType', label: 'Assay type' },
  {
    id: 'sourceUrl',
    label: 'Source',
    renderCell: ({ sourceName, sourceUrl }) => (
      <Link external to={sourceUrl}>
        {sourceName}
      </Link>
    ),
    filterValue: false,
  },
];

const ReferencesCell = ({ children }) => {
  return children
    .filter(reference => reference.pubmedId || reference.refLink)
    .map(({ pubUrl, refLabel, pubmedId }) => {
      const isHecatos = pubUrl.indexOf('hecatos') !== -1;
      const heCaTosUrl = 'https://cordis.europa.eu/project/id/602156/reporting';
      return (
        <React.Fragment key={`${refLabel}:${pubUrl}`}>
          <Link external to={isHecatos ? heCaTosUrl : pubUrl}>
            {refLabel || (pubmedId ? `Pubmed ID: ${pubmedId}` : '(no name)')}
          </Link>{' '}
        </React.Fragment>
      );
    });
};

export default SafetyTables;
