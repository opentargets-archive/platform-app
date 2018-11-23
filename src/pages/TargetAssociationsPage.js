import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { OtTable } from 'ot-ui';

import BasePage from './BasePage';
import ScoreCell from '../components/ScoreCell';

const columns = dataTypes => [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => d.disease.name,
  },
  { id: 'score', label: 'Overall' },
  ...dataTypes.enumValues.map(dt => ({
    id: dt.name,
    label: dt.name,
    renderCell: d => (
      <ScoreCell score={d.dataTypes.find(t => t.dataType === dt.name).score} />
    ),
  })),
];

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
      }
    }
  }
`;

class TargetAssociationsPage extends Component {
  render() {
    const { ensgId } = this.props.match.params;

    return (
      <BasePage>
        <Query query={targetAssociationsQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }

            const { dataTypes, targetAssociations } = data;
            return (
              <OtTable
                loading={false}
                error={null}
                columns={columns(dataTypes)}
                data={targetAssociations.associations}
              />
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default TargetAssociationsPage;
