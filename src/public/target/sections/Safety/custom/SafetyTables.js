import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import { OtTableRF, Link, DataDownloader } from 'ot-ui';

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
          <DataDownloader
            tableHeaders={effectsColumns}
            rows={getAdverseDownloadData(adverseEffects)}
            fileStem={`${symbol}-safety-effects`}
          />
          <OtTableRF columns={effectsColumns} data={adverseEffects} />
        </>
      )}
      {hasRiskInfo && (
        <>
          <Typography variant="h6">Safety risk information</Typography>
          <DataDownloader
            tableHeaders={riskColumns}
            rows={getRiskDownloadData(safetyRiskInfo)}
            fileStem={`${symbol}-risk-information`}
          />
          <OtTableRF columns={riskColumns} data={safetyRiskInfo} />
        </>
      )}
      {(hasTox21 || hasEtox) && (
        <>
          <Typography variant="h6">
            Non-clinical experimental toxicity
          </Typography>
          <Typography>
            Details on the routine testing and screening of {symbol} in
            non-clinical experimental toxicity panels.
          </Typography>
        </>
      )}
      {hasTox21 && (
        <>
          <DataDownloader
            tableHeaders={tox21Columns}
            rows={tox21}
            fileStem={`${symbol}-tox21`}
          />
          <OtTableRF columns={tox21Columns} data={tox21} />
        </>
      )}
      {hasTox21 && hasEtox && (
        <Box my={1}>
          <Divider />
        </Box>
      )}
      {hasEtox && (
        <>
          <DataDownloader
            tableHeaders={etoxColumns}
            rows={etox}
            fileStem={`${symbol}-etox`}
          />
          <OtTableRF columns={etoxColumns} data={etox} />
        </>
      )}
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
  },
  {
    id: 'references',
    label: 'Publications',
    renderCell: ({ references }) => (
      <ReferencesCell>{references}</ReferencesCell>
    ),
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
  },
  {
    id: 'safety_liability',
    label: 'Safety liability information',
    renderCell: ({ safetyLiability }) => safetyLiability,
  },
  {
    id: 'references',
    label: 'Publications',
    renderCell: ({ references }) => (
      <ReferencesCell>{references}</ReferencesCell>
    ),
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
  },
];

const ReferencesCell = ({ children }) =>
  children
    .filter(reference => reference.pubmedId || reference.refLink)
    .map(({ pubUrl, refLabel, pubmedId }) => {
      const isHecatos = pubUrl.indexOf('hecatos') !== -1;
      return (
        <React.Fragment key={`${refLabel}:${pubUrl}`}>
          <Link external to={pubUrl}>
            <Tooltip
              title={
                isHecatos
                  ? "HeCaToS Deliverable D01.5 (2015) funded by 'EU 7th Framework Programme (HEALTH-F4-2013-602156).'"
                  : ''
              }
              placement="top"
            >
              <span>
                {refLabel ||
                  (pubmedId ? `Pubmed ID: ${pubmedId}` : '(no name)')}
              </span>
            </Tooltip>
          </Link>{' '}
        </React.Fragment>
      );
    });

const getAdverseDownloadData = rows => {
  const flattenEffects = subGraph => _.flatMap(subGraph, ({ terms }) => terms);

  return rows.map(row => ({
    organs_systems_affected: row.organsSystemsAffected
      .map(organ => organ.preferredTerm)
      .join(', '),
    activation_effects: flattenEffects(row.activationEffects).join(', '),
    inhibition_effects: flattenEffects(row.inhibitionEffects).join(', '),
    references: row.references.map(ref => ref.pubUrl).join(', '),
  }));
};

const getRiskDownloadData = rows => {
  return rows.map(row => ({
    organs_systems_affected: row.organsSystemsAffected
      .map(organ => organ.preferredTerm)
      .join(', '),
    safety_liability: row.safetyLiability,
    references: row.references.map(ref => ref.pubUrl).join(', '),
  }));
};

export default SafetyTables;
