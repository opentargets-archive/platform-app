import React from 'react';
import { Link } from 'ot-ui';

function Description({ symbol, name }) {
  return (
    <>
      Crowdsourced expert knowledge establishing consensus causation evidence
      associating <strong>{symbol}</strong> with <strong>{name}</strong>.
      Source:{' '}
      <Link to="https://panelapp.genomicsengland.co.uk" external>
        Genomics England PanelApp
      </Link>
    </>
  );
}

export default Description;
