import React, { Component, Fragment } from 'react';
import { scroller, animateScroll } from 'react-scroll';
import { Query } from 'react-apollo';
import ls from 'local-storage';

import MiniWidgetBar from '../common/MiniWidgetBar';
import SectionPanelsContainer from '../common/SectionPanelsContainer';
import DescriptionAndSynonyms from '../common/DescriptionAndSynonyms';

class Profile extends Component {
  state = {
    sectionsOrder: [],
    sectionHasSummaryData: {},
    sectionHasSummaryError: {},
  };
  scrollToSection = sectionId => {
    scroller.scrollTo(sectionId, { duration: 500, delay: 100, smooth: true });
  };
  scrollToTop = () => {
    animateScroll.scrollTo(0, { duration: 500, delay: 100, smooth: true });
  };
  setSectionHasSummaryData = sectionId => value => {
    this.setState({
      sectionHasSummaryData: {
        ...this.state.sectionHasSummaryData,
        [sectionId]: value,
      },
    });
  };
  setSectionHasSummaryError = sectionId => value => {
    this.setState({
      sectionHasSummaryError: {
        ...this.state.sectionHasSummaryData,
        [sectionId]: value,
      },
    });
  };
  handleSectionOrderChange = sectionsOrder => {
    const { sectionsOrderKey } = this.props;
    ls.set(sectionsOrderKey, sectionsOrder);
    this.setState({ sectionsOrder });
  };
  componentDidMount() {
    const { unorderedSections, sectionsOrderKey } = this.props;

    // get the sections order from local storage
    // (only needs to be done once)
    const sectionsOrder = ls.get(sectionsOrderKey);

    // set up boolean state for each section, so that they can be toggled
    // on by a callback or valid graphql summary data
    // (needs to be done if page changes, eg. visit another target)
    const sectionHasSummaryData = unorderedSections.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
    const sectionHasSummaryError = unorderedSections.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});

    this.setState({
      sectionsOrder,
      sectionHasSummaryData,
      sectionHasSummaryError,
    });
  }
  // componentDidUpdate() {
  //   // TODO: reset sections state if the page changed
  //   this.setInitialSectionsState();
  // }
  render() {
    const {
      sectionHasSummaryData,
      sectionHasSummaryError,
      sectionsOrder,
    } = this.state;
    const {
      entity,
      variables,
      query,
      unorderedSections,
      entitySummariesAccessor,
      entitySectionsAccessor,
    } = this.props;
    const { description, synonyms } = entity;
    const sections = sectionsOrder.map(d =>
      unorderedSections.find(e => e.id === d)
    );
    return (
      <Query {...{ query, variables }} errorPolicy="all">
        {({ loading, error, data }) => {
          const summariesData = loading ? {} : entitySummariesAccessor(data);
          const sectionsWithSummaryState = sections.map(s => {
            // an error could occur in graphql api (network or summary specific)
            // or be triggered from the component itself (eg. by external API)
            const summaryErrorFromGraphQL =
              error &&
              (error.networkError ||
                (error.graphQLErrors &&
                  error.graphQLErrors.some(e => e.path[2] === s.id)));
            const summaryErrorFromSummaryComponent =
              sectionHasSummaryError[s.id];
            const summaryError =
              summaryErrorFromGraphQL || summaryErrorFromSummaryComponent;

            // if non-null data was loaded through graphql api,
            // or the callback passed to SummaryComponent was used,
            // set flag so we load the detail section
            const hasDataFromGraphQLAPI =
              !summaryErrorFromGraphQL && !loading && s.hasSummaryData
                ? s.hasSummaryData(summariesData[s.id])
                : false;
            const hasDataFromSummaryComponent = sectionHasSummaryData[s.id];
            const hasData =
              hasDataFromGraphQLAPI || hasDataFromSummaryComponent;

            const summaryDataProps =
              !summaryError && !loading ? summariesData[s.id] : {};
            const summaryProps = {
              ...summaryDataProps,
              setHasSummaryData: this.setSectionHasSummaryData(s.id),
              setHasSummaryError: this.setSectionHasSummaryError(s.id),
            };

            return {
              loading: loading,
              error: summaryError ? 'An API error occurred' : null,
              hasData,
              summaryError,
              summaryProps,
              ...s,
            };
          });

          return (
            <Fragment>
              <DescriptionAndSynonyms {...{ description, synonyms }} />
              <MiniWidgetBar
                entity={entity}
                data={sectionsWithSummaryState}
                onWidgetClick={this.scrollToSection}
              />
              <br />
              <SectionPanelsContainer
                entity={entity}
                entitySectionsAccessor={entitySectionsAccessor}
                data={sectionsWithSummaryState}
                onSideMenuItemClick={this.scrollToSection}
                onScrollToTopClick={this.scrollToTop}
                onSectionOrderChange={this.handleSectionOrderChange}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Profile;
