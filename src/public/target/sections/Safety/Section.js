import React from 'react';
import _ from 'lodash';

import SafetyTables from './custom/SafetyTables';

const Section = ({ symbol, data }) => {
  return (
    <SafetyTables
      symbol={symbol}
      data={{
        adverseEffects: data.adverseEffects.map(row => ({
          organsSystemsAffected: row.organsSystemsAffected
            .map(organ => ({ ...organ, preferredTerm: organ.mappedTerm }))
            .filter(organ => organ.preferredTerm),
          activationEffects: listTermsByGroup(row.activationEffects),
          inhibitionEffects: listTermsByGroup(row.inhibitionEffects),
          references: addPubUrl(row.references),
        })),
        safetyRiskInfo: data.safetyRiskInfo.map(row => ({
          ...row,
          organsSystemsAffected: addPreferredTerm(row.organsSystemsAffected),
          references: addPubUrl(row.references),
        })),
        tox21: data.experimentalToxicity
          .filter(row => row.dataSource === 'Tox21')
          .map(row => ({
            ...extractAssayFields(row),
            cellName:
              _.upperFirst(row.experimentDetails.cellShortName) || 'N/A',
            sourceName: 'Tox21',
            sourceUrl: 'https://tripod.nih.gov/tox21/assays/',
          })),
        etox: data.experimentalToxicity
          .filter(row => row.dataSource === 'eTOX')
          .map(row => ({
            ...extractAssayFields(row),
            tissue: _.upperFirst(row.experimentDetails.tissue) || 'N/A',
            sourceName: 'eTOX',
            sourceUrl: row.dataSourceReferenceLink,
          })),
      }}
    />
  );
};

const listTermsByGroup = effectsSubGraph =>
  Object.entries(effectsSubGraph)
    // exclude GraphQL introspection properties
    .filter(([key, __]) => !key.startsWith('__'))
    .map(([groupKey, effects]) => ({
      groupKey,
      terms: addPreferredTerm(effects).map(effect => effect.preferredTerm),
    }))
    .filter(group => group.terms.length);

const addPreferredTerm = section =>
  section
    .map(organ => ({
      ...organ,
      preferredTerm: organ.mappedTerm || organ.termInPaper,
    }))
    .filter(organ => organ.preferredTerm);

const addPubUrl = referencesSection =>
  referencesSection
    .map(ref => ({
      ...ref,
      pubUrl: ref.pubmedId
        ? 'https://europepmc.org/abstract/MED/' + ref.pubmedId
        : ref.refLink,
    }))
    .filter(ref => ref.pubUrl);

const extractAssayFields = toxicityRow => ({
  assayFormat: _.upperFirst(toxicityRow.experimentDetails.assayFormat),
  assayDescription: toxicityRow.experimentDetails.assayDescription,
  assayType: _.upperFirst(toxicityRow.experimentDetails.assayFormatType),
});

export default Section;
