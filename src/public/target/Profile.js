import React, { Component, Fragment } from 'react';
import { scroller, animateScroll } from 'react-scroll';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

import * as sectionsObject from './sectionIndex';

import MiniWidgetBar from '../common/MiniWidgetBar';
import SectionPanelsContainer from '../common/SectionPanelsContainer';

import DescriptionAndSynonyms from '../common/DescriptionAndSynonyms';

// const sections = [
//   {
//     id: 'bibliography',
//     name: 'Bibliography',
//     getHasData: () => false, // TODO: calculate properly
//     // getSummary: ({ bibliographyCount }) =>
//     //   `${bibliographyCount ? bibliographyCount : 0} paper${
//     //     bibliographyCount !== 1 ? 's' : null
//     //   }`,
//     getSummary: () => 'TODO',
//     SectionComponent: BibliographySection,
//     renderDescription: ({ symbol }) => (
//       <React.Fragment>
//         Scientific literature on {symbol}. The list of publications is generated
//         by text mining PubMed abstracts with Natural Language Processing (NLP).
//       </React.Fragment>
//     ),
//   },
//   {
//     id: 'safety',
//     name: 'Safety',
//     getHasData: () => true, // TODO: calculate properly
//     getSummary: () => 'TODO', // TODO: calculate properly
//     SectionComponent: SafetySection,
//     renderDescription: ({ symbol }) => (
//       <React.Fragment>
//         Known safety effects and safety risk information for {symbol}.
//       </React.Fragment>
//     ),
//   },
//   {
// ];

const sections = Object.values(sectionsObject);

const summariesQuery = gql`
  query TargetSummaryQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      uniprotId
      symbol
      summaries {
        ${sections.map(s => `...${s.id}Fragment`).join('\n')}
      }
    }
  }
  ${sections.map(s => print(s.summaryQuery)).join('\n')}
`;

class TargetProfile extends Component {
  scrollToSection = sectionId => {
    scroller.scrollTo(sectionId, { duration: 500, delay: 100, smooth: true });
  };
  scrollToTop = () => {
    animateScroll.scrollTo(0, { duration: 500, delay: 100, smooth: true });
  };
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
      <Query query={summariesQuery} variables={{ ensgId }} errorPolicy="all">
        {({ loading, error, data }) => {
          const sectionsWithHasData = sections.map(s => {
            const summaryError =
              error &&
              (error.networkError ||
                (error.graphQLErrors &&
                  error.graphQLErrors.some(e => e.path[2] === s.id))) &&
              !(
                data &&
                data.target &&
                data.target.summaries &&
                data.target.summaries[s.id]
              );
            const summaryProps =
              !summaryError && !loading ? data.target.summaries[s.id] : {};
            return {
              loading: loading,
              error: summaryError ? 'An API error occurred' : null,
              hasData:
                !summaryError && !loading && s.hasSummaryData
                  ? s.hasSummaryData(data.target.summaries[s.id])
                  : false,
              summaryError,
              summaryProps,
              ...s,
            };
          });

          return (
            <Fragment>
              <DescriptionAndSynonyms {...{ description, synonyms }} />
              <MiniWidgetBar
                data={sectionsWithHasData}
                onWidgetClick={this.scrollToSection}
              />
              <br />
              <SectionPanelsContainer
                entity={entity}
                data={sectionsWithHasData}
                onSideMenuItemClick={this.scrollToSection}
                onScrollToTopClick={this.scrollToTop}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default TargetProfile;
