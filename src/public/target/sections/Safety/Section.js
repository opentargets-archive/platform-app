import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { OtTableRF, Link, DataDownloader } from 'ot-ui';

const Section = ({ symbol, data }) => {
  const { adverseEffects, safetyRiskInfo } = data;
  return (
    <>
      <Typography variant="h6">Known safety effects</Typography>
      <DataDownloader
        tableHeaders={effectsColumns}
        rows={getAdverseDownloadData(adverseEffects)}
        fileStem={`${symbol}-safety-effects`}
      />
      <OtTableRF columns={effectsColumns} data={adverseEffects} />
      <Typography variant="h6">Safety risk information</Typography>
      <DataDownloader
        tableHeaders={riskColumns}
        rows={getRiskDownloadData(safetyRiskInfo)}
        fileStem={`${symbol}-risk-information`}
      />
      <OtTableRF columns={riskColumns} data={safetyRiskInfo} />
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
          .filter(organ => organ.code && organ.mappedTerm)
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
      listTermsByGroup(activationEffects).map(({ groupKey, terms }) => (
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
      listTermsByGroup(inhibitionEffects).map(({ groupKey, terms }) => (
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
          .filter(
            organ => organ.code && (organ.mappedTerm || organ.termInPaper)
          )
          .map(organ => (
            <li key={organ.code}>{organ.mappedTerm || organ.termInPaper}</li>
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

const ReferencesCell = ({ children }) =>
  children
    .filter(reference => reference.pubmedId || reference.refLink)
    .map(({ pubmedId, refLink, refLabel }) => {
      const pubUrl = pubmedId
        ? 'https://europepmc.org/abstract/MED/' + pubmedId
        : refLink;
      const isHecatos = refLink && refLink.indexOf('hecatos') !== -1;
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
  const flattenEffects = subGraph =>
    _.flatMap(listTermsByGroup(subGraph), ({ terms }) => terms);

  return rows.map(row => ({
    organs_systems_affected: row.organsSystemsAffected
      .map(organ => organ.mappedTerm)
      .filter(term => term)
      .join(', '),
    activation_effects: flattenEffects(row.activationEffects).join(', '),
    inhibition_effects: flattenEffects(row.inhibitionEffects).join(', '),
    references: row.references
      .map(ref =>
        ref.pubmedId
          ? 'https://europepmc.org/abstract/MED/' + ref.pubmedId
          : ref.refLink
      )
      .filter(link => link)
      .join(', '),
  }));
};

const getRiskDownloadData = rows => {
  return rows.map(row => ({
    organs_systems_affected: row.organsSystemsAffected
      .map(organ => organ.mappedTerm || organ.termInPaper)
      .filter(term => term)
      .join(', '),
    safety_liability: row.safetyLiability,
    references: row.references
      .map(ref =>
        ref.pubmedId
          ? 'https://europepmc.org/abstract/MED/' + ref.pubmedId
          : ref.refLink
      )
      .filter(link => link)
      .join(', '),
  }));
};

const listTermsByGroup = effectsSubGraph =>
  Object.entries(effectsSubGraph)
    // exclude GraphQL introspection properties
    .filter(([key, __]) => !key.startsWith('__'))
    .map(([groupKey, effects]) => ({
      groupKey,
      terms: effects
        .map(effect => effect.mappedTerm || effect.termInPaper)
        .filter(term => term),
    }))
    .filter(({ terms }) => terms.length);

export default Section;
