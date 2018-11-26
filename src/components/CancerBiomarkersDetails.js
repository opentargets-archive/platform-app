import React, { Component, Fragment } from 'react';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import { OtTable } from 'ot-ui';

import DCContainer from './DCContainer';

const columns = [
  { id: 'biomarker', label: 'Biomarker' },
  {
    id: 'diseases',
    label: 'Disease',
    renderCell: rowData => {
      return rowData.diseases.map(disease => disease.efoLabel).join(', ');
    },
  },
  { id: 'drugName', label: 'Drug' },
  { id: 'associationType', label: 'Association' },
  { id: 'evidenceLevel', label: 'Evidence' },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData => {
      const result = rowData.sources.map(source => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.label}
        </a>
      ));
      return result;
    },
  },
];

class CancerBiomarkersDetails extends Component {
  componentDidMount() {
    this.renderCharts();
  }

  render() {
    const { rows } = this.props;

    return (
      <Fragment>
        <DCContainer id="biomarkers-by-drug" title="Biomarkers by drug" />
        <DCContainer
          id="biomarkers-by-association"
          title="Biomarkers by association"
        />
        <DCContainer
          id="biomarkers-drugs-heatmap"
          title="Biomarkers and drugs"
        />
        <OtTable columns={columns} data={rows} />;
      </Fragment>
    );
  }

  renderCharts() {
    const { rows } = this.props;
    const biomarkers = crossfilter(rows);

    const biomarkersByDrug = biomarkers.dimension(d => d.drugName);
    const biomarkersByAssociation = biomarkers.dimension(
      d => d.associationType
    );

    const biomarkersByDrugGroup = biomarkersByDrug.group();

    const biomarkersByDrugChart = dc.rowChart('#biomarkers-by-drug');
    const biomarkersByAssociationChart = dc.rowChart(
      '#biomarkers-by-association'
    );
    const biomarkersDrugsHeatmap = dc.heatMap('#biomarkers-drugs-heatmap');

    /*

    biomarkersByDrugChart
      .width(280)
      .height(280)
      .margins({ top: 20, left: 10, right: 10, bottom: 20 })
      .dimension(biomarkersByDrug);
      */
  }
}

export default CancerBiomarkersDetails;
