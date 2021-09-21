import React from 'react';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

import HeaderBase from '../../components/Header';
import { ExternalLink } from '../../components/ExternalLink';
import { XRefLinks } from '../../components/ExternalLink';

const urlStems = {
  mondo: 'http://purl.obolibrary.org/obo/MONDO_',
  mesh: 'https://identifiers.org/mesh:',
  ncit: 'https://identifiers.org/ncit:',
  meddra: 'https://identifiers.org/meddra:',
  umls: 'https://identifiers.org/umls:',
  orphanet: 'https://identifiers.org/orphanet:',
  icd10: 'https://identifiers.org/icd:',
  omim: 'https://www.omim.org/entry/',
};

function Header({ loading, efoId, name, dbXRefs = [] }) {
  console.log('dbXRefs', dbXRefs);
  const efoUrl = `https://www.ebi.ac.uk/ols/ontologies/efo/terms?short_form=${efoId}`;
  const xrefs = {};

  for (let i = 0; i < dbXRefs.length; i++) {
    const [label, id] = dbXRefs[i].split(':');
    const source = label.toLowerCase();

    if (urlStems[source]) {
      if (xrefs[source]) {
        xrefs[source].ids.push(id);
      } else {
        xrefs[source] = {
          label,
          urlStem: urlStems[source],
          ids: [id],
        };
      }
    }
  }

  // console.log('LOL', data);

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
