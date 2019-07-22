import React from 'react';
import Grid from '@material-ui/core/Grid';

import Description from './Description';
import Synonyms from './Synonyms';

const DescriptionAndSynonyms = ({ synonyms, description }) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <Description>{description}</Description>
    </Grid>
    <Grid item xs={12} md={6}>
      <Synonyms synonyms={synonyms} />
    </Grid>
  </Grid>
);

export default DescriptionAndSynonyms;
