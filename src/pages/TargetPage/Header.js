import React from 'react';
import { Button } from '@material-ui/core';
import { faDna } from '@fortawesome/free-solid-svg-icons';

import {
  CrisprDepmapLink,
  ExternalLink,
  TepLink,
} from '../../components/ExternalLink';
import HeaderBase from '../../components/Header';

function Header({ loading, ensgId, uniprotId, symbol, name, crisprId }) {
  const ensemblUrl = `https://identifiers.org/ensembl:${ensgId}`;
  const uniprotUrl = `https://identifiers.org/uniprot:${uniprotId}`;
  const genecardsUrl = `https://identifiers.org/genecards:${symbol}`;
  const hgncUrl = `https://identifiers.org/hgnc.symbol:${symbol}`;
  const geneticsUrl = `https://genetics.opentargets.org/gene/${ensgId}`;

  return (
    <HeaderBase
      loading={loading}
      title={symbol}
      subtitle={name}
      Icon={faDna}
      externalLinks={
        <>
          <ExternalLink title="Ensembl" id={ensgId} url={ensemblUrl} />
          <ExternalLink title="UniProt" id={uniprotId} url={uniprotUrl} />
          <ExternalLink title="GeneCards" id={symbol} url={genecardsUrl} />
          <ExternalLink title="HGNC" id={symbol} url={hgncUrl} />
          <CrisprDepmapLink id={crisprId} />
          <TepLink ensgId={ensgId} symbol={symbol} />
        </>
      }
      rightContent={
        <Button
          href={geneticsUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          variant="contained"
          disableElevation
        >
          View {symbol} in Open Targets Genetics
        </Button>
      }
    />
  );
}

export default Header;
