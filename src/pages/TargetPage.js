import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const targetQuery = gql`
  query TargetQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      name
      symbol
      synonyms
    }
  }
`;

const TargetPage = ({ match }) => {
  const { ensgId } = match.params;
  return (
    <div>
      <h1>{ensgId}</h1>
      <Query query={targetQuery} variables={{ ensgId }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
          const { symbol, name, synonyms } = data.target;
          return (
            <div>
              <h2>{symbol}</h2>
              <h3>{name}</h3>
              <h4>{synonyms.join(", ")}</h4>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default TargetPage;
