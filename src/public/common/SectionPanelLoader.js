import React from 'react';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';

const SectionQuery = ({
  sectionId,
  sectionQuery,
  entity,
  entitySectionsAccessor,
  getDetailFromDetails,
  SectionComponent,
}) => {
  const { loading, error, data, fetchMore } = useQuery(sectionQuery, {
    variables: { ...entity },
  });

  if (error) {
    return (
      <Typography color="error" align="center">
        {error.message}
      </Typography>
    );
  }

  if (loading) return null;

  const sectionsData = entitySectionsAccessor(data);
  const sectionData = getDetailFromDetails
    ? getDetailFromDetails(sectionsData)
    : sectionsData[sectionId];

  return (
    <SectionComponent {...entity} data={sectionData} fetchMore={fetchMore} />
  );
};

const SectionPanelLoader = ({
  sectionId,
  entity,
  entitySectionsAccessor,
  getDetailFromDetails,
  error,
  loading,
  hasData,
  sectionQuery,
  SectionComponent,
}) => {
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
        <SectionQuery
          sectionId={sectionId}
          sectionQuery={sectionQuery}
          entity={entity}
          entitySectionsAccessor={entitySectionsAccessor}
          getDetailFromDetails={getDetailFromDetails}
          SectionComponent={SectionComponent}
        />
      );
    } else {
      return <SectionComponent {...entity} />;
    }
  }
};

export default SectionPanelLoader;
