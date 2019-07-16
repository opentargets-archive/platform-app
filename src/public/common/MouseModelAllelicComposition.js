import React from 'react';

import Typography from '@material-ui/core/Typography';

const MouseModelAllelicComposition = ({
  allelicComposition,
  geneticBackground,
}) => {
  const regex = /(.*)<(.*)>\/([^<]*)<?([^>]*)?>?/;
  return (
    <React.Fragment>
      {allelicComposition.map((composition, i) => {
        const match = regex.exec(composition);
        return (
          <Typography key={i}>
            {match !== null ? (
              <React.Fragment>
                {match[1]}
                <sup>{match[2]}</sup>/{match[3]}
                <sup>{match[4]}</sup>
              </React.Fragment>
            ) : (
              composition
            )}
          </Typography>
        );
      })}
      <Typography variant="caption">{geneticBackground}</Typography>
    </React.Fragment>
  );
};

export default MouseModelAllelicComposition;
