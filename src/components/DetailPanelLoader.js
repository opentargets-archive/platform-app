import React from 'react';
import { Query } from 'react-apollo';

import TargetSummaryContext from '../contexts/TargetSummaryContext';

class DetailPanelLoader extends React.Component {
  render() {
    const { sectionId, query, SectionComponent } = this.props;
    const targetContext = this.context;
    const { ensgId } = targetContext;

    // Some sections have multiple queries on different tabs, for example,
    // so manage this themselves.
    if (query) {
      return (
        <Query query={query} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            const sectionData = data.target.details[sectionId];
            return (
              <SectionComponent {...{ ...targetContext, data: sectionData }} />
            );
          }}
        </Query>
      );
    } else {
      return <SectionComponent {...{ ...targetContext }} />;
    }
  }
}
DetailPanelLoader.contextType = TargetSummaryContext;

export default DetailPanelLoader;
