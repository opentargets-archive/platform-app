import React from 'react';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

// import TargetSummaryContext from '../../contexts/TargetSummaryContext';

class SectionPanelLoader extends React.Component {
  render() {
    const {
      sectionId,
      error,
      loading,
      hasData,
      query,
      SectionComponent,
    } = this.props;
    const targetContext = this.context;
    const { ensgId } = targetContext;

    if (error) {
      return (
        <Typography color="error" align="center">
          {error}
        </Typography>
      );
    } else if (loading) {
      return null;
    } else if (!hasData) {
      return null;
    } else {
      // Some sections have multiple queries on different tabs, for example,
      // so manage this themselves.
      if (query) {
        return (
          <Query query={query} variables={{ ensgId }}>
            {({ loading: loading2, error: error2, data }) => {
              if (error2) {
                return (
                  <Typography color="error" align="center">
                    {error2.message}
                  </Typography>
                );
              } else if (loading2) {
                return null;
              } else {
                const sectionData = data.target.details[sectionId];
                return (
                  <SectionComponent
                    {...{ ...targetContext, data: sectionData }}
                  />
                );
              }
            }}
          </Query>
        );
      } else {
        return <SectionComponent {...targetContext} />;
      }
    }
  }
}
// SectionPanelLoader.contextType = TargetSummaryContext;

export default SectionPanelLoader;
