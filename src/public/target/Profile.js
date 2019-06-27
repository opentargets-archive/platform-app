import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

import { targetSectionsDefaultOrder } from '../configuration';
import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';

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
          .map(s => `...${s.id}Fragment`)
          .join('\n')}
      }
    }
  }
  ${sections
    .filter(s => s.summaryQuery)
    .map(s => print(s.summaryQuery))
    .join('\n')}
`;

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
    const entitySummariesAccessor = data =>
      data && data.target && data.target.summaries
        ? data.target.summaries
        : null;
    const entitySectionsAccessor = data =>
      data && data.target && data.target.details ? data.target.details : null;
    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { ensgId },
          defaultSectionsOrder: targetSectionsDefaultOrder,
          sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      />
    );
  }
}

export default TargetProfile;
