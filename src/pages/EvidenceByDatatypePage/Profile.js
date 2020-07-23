import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import _ from 'lodash';

import * as sectionsObject from './sectionIndex';
import BaseProfile from '../../components/Profile';

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

const entitySummariesAccessor = data =>
  data && data.evidence && data.evidence.summaries
    ? data.evidence.summaries
    : null;
const entitySectionsAccessor = data =>
  data && data.evidence && data.evidence.details ? data.evidence.details : null;

class EvidenceProfile extends Component {
  render() {
    const { ensgId, efoId, target, disease } = this.props;
    const entity = {
      ensgId,
      efoId,
      target,
      disease,
    };
    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { ensgId, efoId },
          sectionsOrderKey: 'evidenceByDatatypeSectionsOrder',
          unorderedSections: sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      />
    );
  }
}

export default EvidenceProfile;
