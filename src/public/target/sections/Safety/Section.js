import React from 'react';

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

export default Section;
