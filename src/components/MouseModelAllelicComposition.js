import React from 'react';
import { Typography } from '@material-ui/core';

function MouseModelAllelicComposition({
  allelicComposition,
  geneticBackground,
}) {
  const regex = /(.*)<(.*)>\/([^<]*)<?([^>]*)?>?/;
  const match = regex.exec(allelicComposition);
  return (
    <>
      <Typography variant="body2">
        {match !== null ? (
          <>
            {match[1]}
            <sup>{match[2]}</sup>/{match[3]}
            <sup>{match[4]}</sup>
          </>
        ) : (
          allelicComposition
        )}
      </Typography>
      <Typography variant="caption">{geneticBackground}</Typography>
    </>
  );
}

export default MouseModelAllelicComposition;
