import React from 'react';
import { Typography } from '@material-ui/core';

const BibliographyHtmlText = ({ text }) => {
  return (
    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export default BibliographyHtmlText;
