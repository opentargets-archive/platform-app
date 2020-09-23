import React from 'react';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

import HeaderBase from '../../components/Header';
import { ExternalLink } from '../../components/ExternalLink';

function Header({ loading, efoId, name }) {
  const efoUrl = `https://www.ebi.ac.uk/ols/ontologies/efo/terms?short_form=${efoId}`;

  return (
    <HeaderBase
      loading={loading}
      title={name}
      Icon={faStethoscope}
      externalLinks={<ExternalLink title="EFO" id={efoId} url={efoUrl} />}
    />
  );
}

export default Header;
