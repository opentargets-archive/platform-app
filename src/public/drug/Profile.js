import React, { Component } from 'react';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

import { drugSectionsDefaultOrder } from '../configuration';
import * as sectionsObject from './sectionIndex';
import BaseProfile from '../common/Profile';

const sections = Object.values(sectionsObject);

// TODO: write, then use disease sections of api
const summariesQuery = gql`
  query DrugSummaryQuery($chemblId: String!) {
    drug(chemblId: $chemblId) {
      id
      name
    }
  }
`;

class DrugProfile extends Component {
  render() {
    const {
      chemblId,
      name,
      type,
      maxPhase,
      firstApproval,
      molecularFormula,
      description,
      synonyms,
    } = this.props;
    const entity = {
      chemblId,
      name,
      type,
      maxPhase,
      firstApproval,
      molecularFormula,
      description,
      synonyms,
    };
    const entitySummariesAccessor = data =>
      data && data.drug && data.drug.summaries ? data.drug.summaries : {};
    const entitySectionsAccessor = data =>
      data && data.drug && data.drug.details ? data.drug.details : null;
    return (
      <BaseProfile
        {...{
          entity,
          query: summariesQuery,
          variables: { chemblId },
          defaultSectionsOrder: drugSectionsDefaultOrder,
          sections,
          entitySummariesAccessor,
          entitySectionsAccessor,
        }}
      />
    );
  }
}

export default DrugProfile;
