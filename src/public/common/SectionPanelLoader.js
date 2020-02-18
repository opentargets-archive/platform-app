import React from 'react';
import { Query } from '@apollo/react-components';
import Typography from '@material-ui/core/Typography';

class SectionPanelLoader extends React.Component {
  render() {
    const {
      sectionId,
      entity,
      entitySectionsAccessor,
      getDetailFromDetails,
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
                const sectionData = getDetailFromDetails
                  ? getDetailFromDetails(sectionsData)
                  : sectionsData[sectionId];
                return (
                  <SectionComponent
                    {...{
                      ...entity,
                      data: sectionData,
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
