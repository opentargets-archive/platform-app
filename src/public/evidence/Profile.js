import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import _ from 'lodash';

import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';

const sections = Object.values(sectionsObject);

const summariesQuery = gql`
  query EvidenceSummaryQuery($ensgId: String!, $efoId: String!) {
    evidence(ensgId: $ensgId, efoId: $efoId) {
      summaries {
        ${sections
          .filter(s => s.summaryQuery)
          .map(s => `...evidence${_.upperFirst(s.id)}Fragment`)
          .join('\n')}
      }
    }
  }
  ${sections
    .filter(s => s.summaryQuery)
    .map(s => print(s.summaryQuery))
    .join('\n')}
`;

class EvidenceProfile extends Component {
  render() {
    const { ensgId, efoId, target, disease } = this.props;
    const entity = {
      ensgId,
      efoId,
      target,
      disease,
      description: null,
      synonyms: [],
    };
    const entitySummariesAccessor = data =>
      data && data.evidence && data.evidence.summaries
        ? data.evidence.summaries
        : null;
    const entitySectionsAccessor = data =>
      data && data.evidence && data.evidence.details
        ? data.evidence.details
        : null;
    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { ensgId, efoId },
          sectionsOrderKey: 'evidenceSectionsOrder',
          unorderedSections: sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      />
    );
  }
}

export default EvidenceProfile;
