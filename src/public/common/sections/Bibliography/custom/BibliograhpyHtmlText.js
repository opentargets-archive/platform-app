import React from 'react';
import Typography from '@material-ui/core/Typography';

const BibliograhpyHtmlText = ({ text }) => {
  return (
    <Typography variant="body2" dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export default BibliograhpyHtmlText;
