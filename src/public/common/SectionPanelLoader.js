import React from 'react';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

class SectionPanelLoader extends React.Component {
  render() {
    const {
      sectionId,
      entity,
      entitySectionsAccessor,
      error,
      loading,
      hasData,
      sectionQuery,
      SectionComponent,
    } = this.props;

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
      if (sectionQuery) {
        return (
          <Query query={sectionQuery} variables={{ ...entity }}>
            {({
              loading: loading2,
              error: error2,
              data,
              refetch,
              fetchMore,
            }) => {
              if (error2) {
                return (
                  <Typography color="error" align="center">
                    {error2.message}
                  </Typography>
                );
              } else if (loading2) {
                return null;
              } else {
                const sectionsData = entitySectionsAccessor(data);
                const sectionData = sectionsData[sectionId];
                return (
                  <SectionComponent
                    {...{
                      ...entity,
                      data: sectionData,
                      refetch: refetch,
                      fetchMore: fetchMore,
                    }}
                  />
                );
              }
            }}
          </Query>
        );
      } else {
        return <SectionComponent {...entity} />;
      }
    }
  }
}

export default SectionPanelLoader;
