import React from 'react';
import Grid from '@material-ui/core/Grid';

import Description from './Description';
import ChipsField from './ChipsField';

const DescriptionAndSynonyms = ({ synonyms, description }) => (
  <Grid style={{ marginTop: '8px' }} container spacing={2}>
    <Grid item xs={12} md={6}>
      <Description>{description}</Description>
    </Grid>
    <Grid item xs={12} md={6}>
      <ChipsField label="Synonyms" terms={synonyms} />
    </Grid>
  </Grid>
);

export default DescriptionAndSynonyms;
