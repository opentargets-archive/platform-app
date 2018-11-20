import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BasePage from './BasePage';
import TargetSummary from '../components/TargetSummary';
import OverviewTab from '../components/OverviewTab';
import ProteinTab from '../components/ProteinTab';
import DrugAndCompoundTab from '../components/DrugAndCompoundTab';
import PathwaysTab from '../components/PathwaysTab';
import GenomicsTab from '../components/GenomicsTab';
import MouseTab from '../components/MouseTab';
import CancerTab from '../components/CancerTab';
import BibliographyTab from '../components/BibliographyTab';
import AssociatedDiseasesTab from '../components/AssociatedDiseasesTab';

const targetQuery = gql`
  query TargetQuery($ensgId: String!) {
    targetSummary(ensgId: $ensgId) {
      id
      name
      symbol
      description
      synonyms
    }
  }
`;

class TargetPage extends Component {
  state = {
    value: 'overview',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { ensgId } = this.props.match.params;
    const { value } = this.state;

    return (
      <BasePage>
        <Query query={targetQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }

            const { symbol, name, synonyms, description } = data.targetSummary;
            return (
              <Fragment>
                <TargetSummary
                  symbol={symbol}
                  name={name}
                  synonyms={synonyms}
                  description={description}
                />
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  scrollable
                  scrollButtons="auto"
                >
                  <Tab value="overview" label="Overview" />
                  <Tab value="protein" label="Protein data" />
                  <Tab value="drug" label="Drug & compound data" />
                  <Tab value="pathways" label="Pathways & interaction data" />
                  <Tab value="genomics" label="Genomic context data" />
                  <Tab value="mouse" label="Mouse model data" />
                  <Tab value="cancer" label="Cancer data" />
                  <Tab value="bibliography" label="Bibliography" />
                  <Tab value="associated" label="Associated diseases" />
                </Tabs>
                {value === 'overview' && (
                  <OverviewTab symbol={symbol} ensgId={ensgId} />
                )}
                {value === 'protein' && <ProteinTab />}
                {value === 'drug' && <DrugAndCompoundTab />}
                {value === 'pathways' && <PathwaysTab />}
                {value === 'genomics' && <GenomicsTab />}
                {value === 'mouse' && <MouseTab />}
                {value === 'cancer' && <CancerTab />}
                {value === 'bibliography' && <BibliographyTab />}
                {value === 'associated' && <AssociatedDiseasesTab />}
              </Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default TargetPage;
