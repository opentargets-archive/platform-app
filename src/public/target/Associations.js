import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// import TargetAssociationsDetail from '../components/TargetAssociationsDetail';

const targetAssociationsQuery = gql`
  query TargetAssociationsQuery($ensgId: String!) {
    dataTypes: __type(name: "DataType") {
      enumValues {
        name
        description
      }
    }
    targetAssociations(ensgId: $ensgId) {
      associations {
        disease {
          id
          name
        }
        score
        dataTypes {
          dataType
          score
        }
        therapeuticAreas {
          id
          name
        }
      }
    }
  }
`;

const TargetAssociationsPage = ({ match }) => {
  return null;
  // const { ensgId } = match.params;
  // return (
  //   <Query query={targetAssociationsQuery} variables={{ ensgId }}>
  //     {({ loading, error, data }) => {
  //       if (loading || error) {
  //         return null;
  //       }

  //       return <TargetAssociationsDetail data={data} />;
  //     }}
  //   </Query>
  // );
};

export default TargetAssociationsPage;
