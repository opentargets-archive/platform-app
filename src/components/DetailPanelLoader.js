import React from 'react';
import { Query } from 'react-apollo';

import TargetSummaryContext from '../contexts/TargetSummaryContext';

class DetailPanelLoader extends React.Component {
  render() {
    const { sectionId, query, SectionComponent } = this.props;
    const targetContext = this.context;
    const { ensgId } = targetContext;
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
  }
}
DetailPanelLoader.contextType = TargetSummaryContext;

export default DetailPanelLoader;
