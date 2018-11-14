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
    value: 0,
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
          <Tab label="Overview" />
          <Tab label="Proptein data" />
          <Tab label="Drug & compound data" />
          <Tab label="Pathways & interaction data" />
          <Tab label="Genomic context data" />
          <Tab label="Mouse model data" />
          <Tab label="Cancer data" />
          <Tab label="Bibliography" />
          <Tab label="Associated diseases" />
        </Tabs>
        {value === 0 && <OverviewTab />}
        {value === 1 && <ProteinTab />}
        {value === 2 && <DrugAndCompoundTab />}
        {value === 3 && <PathwaysTab />}
        {value === 4 && <GenomicsTab />}
        {value === 5 && <MouseTab />}
        {value === 6 && <CancerTab />}
        {value === 7 && <BibliographyTab />}
        {value === 8 && <AssociatedDiseasesTab />}
      </Fragment>
    );
  }
}

export default TargetTabs;
