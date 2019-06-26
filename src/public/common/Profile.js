import React, { Component, Fragment } from 'react';
import { scroller, animateScroll } from 'react-scroll';
import { Query } from 'react-apollo';

import MiniWidgetBar from '../common/MiniWidgetBar';
import SectionPanelsContainer from '../common/SectionPanelsContainer';
import DescriptionAndSynonyms from '../common/DescriptionAndSynonyms';

class Profile extends Component {
  scrollToSection = sectionId => {
    scroller.scrollTo(sectionId, { duration: 500, delay: 100, smooth: true });
  };
  scrollToTop = () => {
    animateScroll.scrollTo(0, { duration: 500, delay: 100, smooth: true });
  };
  render() {
    const {
      entity,
      variables,
      query,
      sections,
      entitySummariesAccessor,
      entitySectionsAccessor,
    } = this.props;
    const { description, synonyms } = entity;
    return (
      <Query {...{ query, variables }} errorPolicy="all">
        {({ loading, error, data }) => {
          const summariesData = entitySummariesAccessor(data);
          const sectionsWithHasData = sections.map(s => {
            const summaryError =
              error &&
              (error.networkError ||
                (error.graphQLErrors &&
                  error.graphQLErrors.some(e => e.path[2] === s.id))) &&
              !(summariesData && summariesData[s.id]);
            const summaryProps =
              !summaryError && !loading ? summariesData[s.id] : {};
            return {
              loading: loading,
              error: summaryError ? 'An API error occurred' : null,
              hasData:
                !summaryError && !loading && s.hasSummaryData
                  ? s.hasSummaryData(summariesData[s.id])
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
                entitySectionsAccessor={entitySectionsAccessor}
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

export default Profile;
