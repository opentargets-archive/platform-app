import React, { Component } from 'react';

import DescriptionAndSynonyms from '../common/DescriptionAndSynonyms';

class DiseaseProfile extends Component {
  render() {
    const { description, synonyms } = this.props;
    return <DescriptionAndSynonyms {...{ description, synonyms }} />;
  }
}

export default DiseaseProfile;
