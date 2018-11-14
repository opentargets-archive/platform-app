import React, { Component, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OverviewTab from './OverviewTab';
import ProteinTab from './ProteinTab';
import DrugAndCompoundTab from './DrugAndCompoundTab';
import PathwaysTab from './PathwaysTab';
import GenomicsTab from './GenomicsTab';
import MouseTab from './MouseTab';
import CancerTab from './CancerTab';
import BibliographyTab from './BibliographyTab';
import AssociatedDiseasesTab from './AssociatedDiseasesTab';

class TargetTabs extends Component {
  state = {
    value: 'overview',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Fragment>
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
        {value === 'overview' && <OverviewTab />}
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
  }
}

export default TargetTabs;
