import React from 'react';
import BibliographySection from '../../../common/sections/Bibliography/Section';

const Section = ({ efoId, name, ...rest }) => (
  <BibliographySection
    keyword={efoId}
    label={name}
    {...{ efoId, name, ...rest }}
  />
);

export default Section;
