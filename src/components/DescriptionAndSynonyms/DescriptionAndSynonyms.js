import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import Chip from '../Chip';
import Description from '../Description';
import LongList from '../LongList';

const DescriptionAndSynonyms = ({ synonyms, description }) => {
  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12} md={6}>
        <Description>{description}</Description>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography display="inline" variant="subtitle2">
          Synonyms:{' '}
        </Typography>
        <LongList
          terms={synonyms}
          maxTerms={10}
          render={synonym => (
            <Chip key={synonym} label={synonym} title={synonym} />
          )}
          size="small"
        />
      </Grid>
    </Grid>
  );
};

export default DescriptionAndSynonyms;
