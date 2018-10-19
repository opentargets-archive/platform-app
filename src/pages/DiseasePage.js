import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const diseaseQuery = gql`
  query DiseaseQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      name
      synonyms
    }
  }
`;

const diseaseDAGQuery = gql`
  query DiseaseDAGQuery($efoId: String!) {
    diseaseDAG(efoId: $efoId) {
      nodes {
        id
        name
        parentIds
      }
    }
  }
`;

const DiseasePage = ({ match }) => {
  const { efoId } = match.params;
  return (
    <div>
      <h1>{efoId}</h1>
      <Query query={diseaseQuery} variables={{ efoId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
          const { name, synonyms } = data.disease;
          return (
            <div>
              <h2>{name}</h2>
              <h4>{synonyms.join(", ")}</h4>
            </div>
          );
        }}
      </Query>
      <Query query={diseaseDAGQuery} variables={{ efoId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
          const { nodes } = data.diseaseDAG;

          const width = 600;
          const height = 600;

          return <svg width={width} height={height} />;
        }}
      </Query>
    </div>
  );
};

export default DiseasePage;
