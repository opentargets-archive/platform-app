import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { scroller, animateScroll } from 'react-scroll';
import ls from 'local-storage';

import MiniWidgetBar from './MiniWidgetBar';
import SectionPanelsContainer from './SectionPanelsContainer';

const defaultGetSummaryFromSummaries = (section, summariesData) => {
  return summariesData[section.id];
};

const hasSummaryData = (summaryFunction, summaryData) => {
  try {
    return summaryFunction(summaryData);
  } catch (e) {
    console.error('Error while dectecting summary data.', e);
    return false;
  }
};

const Profile = ({
  entity,
  variables,
  query,
  unorderedSections,
  entitySummariesAccessor,
  entitySectionsAccessor,
  children,
  sectionsOrderKey,
}) => {
  const [sectionsOrder, setSectionsOrder] = useState(ls.get(sectionsOrderKey));
  const [sectionHasSummaryData, setSectionHasSummaryData] = useState(() => {
    return unorderedSections.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
  });
  const [sectionHasSummaryError, setSectionHasSummaryError] = useState(() => {
    return unorderedSections.reduce((acc, d) => {
      acc[d.id] = false;
      return acc;
    }, {});
  });

  const scrollToSection = sectionId => {
    scroller.scrollTo(sectionId, { duration: 500, delay: 100, smooth: true });
  };
  const scrollToTop = () => {
    animateScroll.scrollTo(0, { duration: 500, delay: 100, smooth: true });
  };
  const setSectionHasSummaryDataHandler = sectionId => value => {
    setSectionHasSummaryData(prevSectionHasSummaryData => {
      return { ...prevSectionHasSummaryData, [sectionId]: value };
    });
  };
  const setSectionHasSummaryErrorHandler = sectionId => value => {
    setSectionHasSummaryError(prevSectionHasSummaryError => {
      return { ...prevSectionHasSummaryError, [sectionId]: value };
    });
  };

  const handleSectionOrderChange = sectionsOrder => {
    ls.set(sectionsOrderKey, sectionsOrder);
    setSectionsOrder(sectionsOrder);
  };

  // componentDidUpdate() {
  //   // TODO: reset sections state if the page changed
  //   this.setInitialSectionsState();
  // }

  const sections = sectionsOrder.map(d =>
    unorderedSections.find(e => e.id === d)
  );

  const { loading, error, data } = useQuery(query, { variables });

  const summariesData = loading ? {} : entitySummariesAccessor(data);
  const sectionsWithSummaryState = sections.map(s => {
    // an error could occur in graphql api (network or summary specific)
    // or be triggered from the component itself (eg. by external API)
    const summaryErrorFromGraphQL =
      error &&
      (error.networkError ||
        (error.graphQLErrors &&
          error.graphQLErrors.some(e => e.path[2] === s.id)));
    const summaryErrorFromSummaryComponent = sectionHasSummaryError[s.id];
    const summaryError =
      summaryErrorFromGraphQL || summaryErrorFromSummaryComponent;

    // if non-null data was loaded through graphql api,
    // or the callback passed to SummaryComponent was used,
    // set flag so we load the detail section
    const summaryData = s.getSummaryFromSummaries
      ? s.getSummaryFromSummaries(summariesData)
      : defaultGetSummaryFromSummaries(s, summariesData);
    const hasDataFromGraphQLAPI =
      !summaryErrorFromGraphQL && !loading && s.hasSummaryData
        ? hasSummaryData(s.hasSummaryData, summaryData)
        : false;
    const hasDataFromSummaryComponent = sectionHasSummaryData[s.id];
    const hasData = hasDataFromGraphQLAPI || hasDataFromSummaryComponent;

    const summaryDataProps = !summaryError && !loading ? summaryData : {};
    const summaryProps = {
      data: summaryDataProps,
      setHasSummaryData: setSectionHasSummaryDataHandler(s.id),
      setHasSummaryError: setSectionHasSummaryErrorHandler(s.id),
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
    <>
      {children}
      <MiniWidgetBar
        entity={entity}
        data={sectionsWithSummaryState}
        onWidgetClick={scrollToSection}
      />
      <br />
      <SectionPanelsContainer
        entity={entity}
        entitySectionsAccessor={entitySectionsAccessor}
        data={sectionsWithSummaryState}
        onSideMenuItemClick={scrollToSection}
        onScrollToTopClick={scrollToTop}
        onSectionOrderChange={handleSectionOrderChange}
      />
    </>
  );
};

export default Profile;
