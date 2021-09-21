import React from 'react';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

import HeaderBase from '../../components/Header';
import { ExternalLink } from '../../components/ExternalLink';
import { XRefLinks } from '../../components/ExternalLink';

const xrefsToDisplay = {
  mondo: { label: 'MONDO', urlStem: 'http://purl.obolibrary.org/obo/MONDO_' },
  mesh: { label: 'MeSH', urlStem: 'https://identifiers.org/mesh:' },
  ncit: { label: 'NCIt', urlStem: 'https://identifiers.org/ncit:' },
  meddra: { label: 'MedDRA', urlStem: 'https://identifiers.org/meddra:' },
  umls: { label: 'UMLS', urlStem: 'https://identifiers.org/umls:' },
  orphanet: { label: 'Orphanet', urlStem: 'https://identifiers.org/orphanet:' },
  icd10: { label: 'ICD10', urlStem: 'https://identifiers.org/icd:' },
  omim: { label: 'OMIM', urlStem: 'https://www.omim.org/entry/' },
};

function processXRefs(dbXRefs) {
  const xrefs = {};
  for (let i = 0; i < dbXRefs.length; i++) {
    const [label, id] = dbXRefs[i].split(':');
    const source = label.toLowerCase();

    if (xrefsToDisplay[source]) {
      if (xrefs[source]) {
        xrefs[source].ids.push(id);
      } else {
        xrefs[source] = {
          label: xrefsToDisplay[source].label,
          urlStem: xrefsToDisplay[source].urlStem,
          ids: [id],
        };
      }
    }
  }
  return xrefs;
}

function Header({ loading, efoId, name, dbXRefs = [] }) {
  console.log('dbXRefs', dbXRefs);
  const efoUrl = `https://www.ebi.ac.uk/ols/ontologies/efo/terms?short_form=${efoId}`;
  const xrefs = processXRefs(dbXRefs);

  return (
    <HeaderBase
      loading={loading}
      title={name || 'Missing name'}
      Icon={faStethoscope}
      externalLinks={
        <>
          <ExternalLink title="EFO" id={efoId} url={efoUrl} />
          {Object.keys(xrefs).map(xref => {
            return (
              <XRefLinks
                key={xref}
                label={xrefs[xref].label}
                urlStem={xrefs[xref].urlStem}
                ids={xrefs[xref].ids}
              />
            );
          })}
        </>
      }
    />
  );
}

export default Header;
