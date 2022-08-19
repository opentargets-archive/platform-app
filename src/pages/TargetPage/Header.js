import React from 'react';
import { Button } from '@material-ui/core';
import { faDna } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

import {
  CrisprDepmapLink,
  ExternalLink,
  TepLink,
  XRefLinks,
} from '../../components/ExternalLink';
import HeaderBase from '../../components/Header';
import RMTLPopover from '../../components/RMTL/RMTLPopover';

function Header({ loading, ensgId, uniprotIds, symbol, name, pmtl, crisprId }) {
  const ensemblUrl = `https://identifiers.org/ensembl:${ensgId}`;
  const genecardsUrl = `https://identifiers.org/genecards:${symbol}`;
  const hgncUrl = `https://identifiers.org/hgnc.symbol:${symbol}`;
  const geneticsUrl = `${config.geneticsPortalUrl}/gene/${ensgId}`;

  return (
    <HeaderBase
      loading={loading}
      title={symbol}
      subtitle={name}
      Icon={faDna}
      externalLinks={
        <>
          <ExternalLink title="Ensembl" id={ensgId} url={ensemblUrl} />
          <XRefLinks
            label="UniProt"
            urlStem="https://identifiers.org/uniprot:"
            ids={uniprotIds}
          />
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
      RMTLPopover={<RMTLPopover pmtl={pmtl} />}
    />
  );
}

export default Header;
