import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

import { diseaseSectionsDefaultOrder } from '../configuration';
import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';

const sections = Object.values(sectionsObject);

// TODO: write, then use disease sections of api
const summariesQuery = gql`
  query DiseaseSummaryQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
    }
  }
`;

class DiseaseProfile extends Component {
  render() {
    const { efoId, name, synonyms, description } = this.props;
    const entity = { efoId, name, synonyms, description };
    const entitySummariesAccessor = data =>
      data && data.disease && data.disease.summaries
        ? data.target.summaries
        : {};
    const entitySectionsAccessor = data =>
      data && data.disease && data.disease.details
        ? data.disease.details
        : null;
    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { efoId },
          defaultSectionsOrder: diseaseSectionsDefaultOrder,
          sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      />
    );
  }
}

export default DiseaseProfile;
