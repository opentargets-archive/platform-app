import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import _ from 'lodash';

import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';
import DescriptionAndSynonyms from '../common/DescriptionAndSynonyms';

const sections = Object.values(sectionsObject);

const summariesQuery = gql`
  query TargetSummaryQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      uniprotId
      symbol
      summaries {
        ${sections
          .filter(s => s.summaryQuery)
          .map(s => `...target${_.upperFirst(s.id)}Fragment`)
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
  data && data.target && data.target.summaries ? data.target.summaries : null;
const entitySectionsAccessor = data =>
  data && data.target && data.target.details ? data.target.details : null;

class TargetProfile extends Component {
  render() {
    const {
      ensgId,
      uniprotId,
      symbol,
      name,
      synonyms,
      description,
    } = this.props;
    const entity = { ensgId, uniprotId, symbol, name, synonyms, description };
    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { ensgId },
          sectionsOrderKey: 'targetSectionsOrder',
          unorderedSections: sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      >
        <DescriptionAndSynonyms description={description} synonyms={synonyms} />
      </BaseProfile>
    );
  }
}

export default TargetProfile;
