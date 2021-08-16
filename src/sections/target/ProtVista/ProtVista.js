import React, { useEffect, useState } from 'react';
import 'litemol/dist/css/LiteMol-plugin.css';

function ProtVista({ uniprotId }) {
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    async function loadProtVista() {
      const ProtVista = await import('protvista-uniprot');

      window.customElements.define('protvista-uniprot', ProtVista.default);
    }

    if (
      window.customElements &&
      !window.customElements.get('protvista-uniprot')
    ) {
      loadProtVista();
    }
    setComponentLoaded(true);
  }, []);

  return !componentLoaded ? (
    <>Loading...</>
  ) : (
    <protvista-uniprot accession={uniprotId} />
  );
}

export default ProtVista;
