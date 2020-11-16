import React from 'react';

import { Typography } from '@material-ui/core';

const makePmidLink = match => {
  var id = match.substring(7);
  return `PMID: <a href="https://europepmc.org/abstract/med/${id}" target="_blank">${id}</a>`;
};

function SubunitTab({ subunits, uniprotId }) {
  return (
    <div>
      <ul>
        {subunits.map((d, i) => {
          // replace PMIDs and 'by similarity' with appropriate links
          const desc = d
            .replace(/Pubmed:\d+/gi, makePmidLink)
            .replace(
              /\(By similarity\)/gi,
              match =>
                `(<a href='https://www.uniprot.org/uniprot/${uniprotId}#interaction' target="_blank" rel="noopener noreferrer">By similarity</a>)`
            );

          return (
            <li key={i}>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SubunitTab;
