import React from 'react';

import BibliographySection from '../../common/Bibliography/Section';

const Section = ({ name, ...rest }) => (
  <BibliographySection keyword={name} label={name} {...{ name, ...rest }} />
);

export default Section;
