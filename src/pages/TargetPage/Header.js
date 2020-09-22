import React from 'react';
import { Button } from '@material-ui/core';
import { faDna } from '@fortawesome/free-solid-svg-icons';

import {
  CrisprDepmapLink,
  ExternalLink,
  TepLink,
} from '../../components/ExternalLink';
import HeaderBase from '../../components/Header';

function Header({ ids }) {
  const { ensgId, uniprotId, symbol, name } = ids;
  const ensemblUrl = `http://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${ensgId}`;
  const uniprotUrl = `https://www.uniprot.org/uniprot/${uniprotId}`;
  const genecardsUrl = `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${symbol}`;
  const hgncUrl = `https://www.genenames.org/tools/search/#!/all?query=${symbol}`;
  const geneticsUrl = `https://genetics.opentargets.org/gene/${ensgId}`;

  return (
    <HeaderBase
      title={symbol}
      subtitle={name}
      Icon={faDna}
      externalLinks={
        <>
          <ExternalLink title="Ensembl" id={ensgId} url={ensemblUrl} />
          <ExternalLink title="UniProt" id={uniprotId} url={uniprotUrl} />
          <ExternalLink title="GeneCards" id={symbol} url={genecardsUrl} />
          <ExternalLink title="HGNC" id={symbol} url={hgncUrl} />
          <CrisprDepmapLink symbol={symbol} />
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
