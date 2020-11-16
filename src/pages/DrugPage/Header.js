import React from 'react';
import { faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';

import { ExternalLink } from '../../components/ExternalLink';
import HeaderBase from '../../components/Header';

function DrugHeader({ loading, chemblId, name }) {
  const chemblUrl = `https://www.ebi.ac.uk/chembl/compound_report_card/${chemblId}/`;

  return (
    <HeaderBase
      loading={loading}
      title={name}
      subtitle={null}
      Icon={faPrescriptionBottleAlt}
      externalLinks={
        <ExternalLink title="ChEMBL" id={chemblId} url={chemblUrl} />
      }
    />
  );
}

export default DrugHeader;
