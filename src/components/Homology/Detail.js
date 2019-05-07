import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Tabs, Tab } from 'ot-ui';

import GeneTreeTab from './GeneTreeTab';
import OrthologyTableTab from './OrthologyTableTab';

const query = gql`
  query HomologyQuery($ensgId: String!) {
    target(ensgId: $ensgId) {
      id
      details {
        homology {
          rows {
            dNdS
            species
            queryPercentageIdentity
            targetPercentageIdentity
            targetGeneId
            targetGeneSymbol
          }
        }
      }
    }
  }
`;

class HomologyDetail extends React.Component {
  state = {
    tab: 'table',
  };
  handleChange = (event, tab) => {
    this.setState({ tab });
  };
  render() {
    const { ensgId, symbol } = this.props;
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Query query={query} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;

            const { rows } = data.target.details.homology;
            return (
              <React.Fragment>
                <Tabs
                  value={tab}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="tree" label="Gene tree" />
                  <Tab value="table" label="Orthology table" />
                </Tabs>
                {tab === 'tree' ? (
                  <GeneTreeTab ensgId={ensgId} symbol={symbol} />
                ) : null}
                {tab === 'table' ? (
                  <OrthologyTableTab symbol={symbol} rows={rows} />
                ) : null}
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default HomologyDetail;
