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
  state = {
    filteredRows: [],
  };

  componentDidMount() {
    this.renderCharts();
  }

  render() {
    const { filteredRows } = this.state;

    return (
      <Fragment>
        <DCContainer id="biomarkers-by-drug" title="Biomarkers by drug" />
        <DCContainer
          id="biomarkers-by-association"
          title="Biomarkers by association"
        />
        <DCContainer
          id="biomarkers-by-evidence"
          title="Biomarkers by Evidence"
        />
        <DCContainer
          id="biomarkers-drugs-heatmap"
          title="Biomarkers and drugs"
        />
        <OtTable columns={columns} data={filteredRows} />;
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
    const biomarkersByEvidence = biomarkers.dimension(d => d.evidenceLevel);
    const biomarkerAndDrug = biomarkers.dimension(d => [
      d.biomarker,
      d.drugName,
    ]);

    const biomarkersByDrugGroup = biomarkersByDrug.group().reduce(
      (acc, data) => {
        if (data.biomarker in acc) {
          acc[data.biomarker]++;
        } else {
          acc[data.biomarker] = 1;
        }
        return acc;
      },
      (acc, data) => {
        acc[data.biomarker]--;
        if (acc[data.biomarker] === 0) {
          delete acc[data.biomarker];
        }
        return acc;
      },
      () => ({})
    );
    console.log('biomarkersByDrugGroup.all()', biomarkersByDrugGroup.all());

    const biomarkersByAssociationGroup = biomarkersByAssociation.group().reduce(
      (acc, data) => {
        if (data.biomarker in acc) {
          acc[data.biomarker]++;
        } else {
          acc[data.biomarker] = 1;
        }
        return acc;
      },
      (acc, data) => {
        acc[data.biomarker]--;
        if (acc[data.biomarker] === 0) {
          delete acc[data.biomarker];
        }
        return acc;
      },
      () => ({})
    );
    console.log(
      'biomarkersByAssociationGroup.all()',
      biomarkersByAssociationGroup.all()
    );

    const biomarkersByEvidenceGroup = biomarkersByEvidence.group().reduce(
      (acc, data) => {
        if (data.biomarker in acc) {
          acc[data.biomarker]++;
        } else {
          acc[data.biomarker] = 1;
        }
        return acc;
      },
      (acc, data) => {
        acc[data.biomarker]--;
        if (acc[data.biomarker] === 0) {
          delete acc[data.biomarker];
        }
        return acc;
      },
      () => ({})
    );
    console.log(
      'biomarkersByEvidenceGroup.all()',
      biomarkersByEvidenceGroup.all()
    );

    const biomarkerAndDrugGroup = biomarkerAndDrug.group().reduce(
      (acc, data) => {
        console.log('data', data);
        return acc + 1;
      },
      (acc, data) => {
        return acc - 1;
      },
      () => 0
    );

    console.log('biomarkerAndDrugGroup.all()', biomarkerAndDrugGroup.all());

    const biomarkersByDrugChart = dc.rowChart('#biomarkers-by-drug');
    const biomarkersByAssociationChart = dc.pieChart(
      '#biomarkers-by-association'
    );
    const biomarkersByEvidenceChart = dc.pieChart('#biomarkers-by-evidence');
    const biomarkersDrugsHeatmap = dc.heatMap('#biomarkers-drugs-heatmap');

    biomarkersByDrugChart
      .width(280)
      .height(280)
      .margins({ top: 20, left: 10, right: 10, bottom: 20 })
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value).length)
      .group(biomarkersByDrugGroup)
      .dimension(biomarkersByDrug)
      .xAxis();

    biomarkersByDrugChart.render();

    biomarkersByDrugChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    biomarkersByAssociationChart
      .width(280)
      .height(280)
      .radius(120)
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value).length)
      .group(biomarkersByAssociationGroup)
      .dimension(biomarkersByAssociation)
      .render();

    biomarkersByAssociationChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    biomarkersByEvidenceChart
      .width(280)
      .height(280)
      .radius(120)
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value).length)
      .group(biomarkersByEvidenceGroup)
      .dimension(biomarkersByEvidence)
      .render();

    biomarkersByEvidenceChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    biomarkersDrugsHeatmap
      .width(380)
      .height(450)
      .margins({ top: 20, left: 200, right: 10, bottom: 150 })
      .dimension(biomarkerAndDrug)
      .group(biomarkerAndDrugGroup)
      .keyAccessor(d => d.key[0])
      .valueAccessor(d => d.key[1])
      .colorAccessor(() => 2)
      .xBorderRadius(0)
      .yBorderRadius(0)
      .render();

    biomarkersDrugsHeatmap.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    this.setState({
      filteredRows: biomarkers.allFiltered(),
    });

    biomarkersDrugsHeatmap
      .selectAll('g.cols.axis > text')
      .attr('transform', function(d) {
        const coord = this.getBBox();
        const x = coord.x + coord.width / 2;
        const y = coord.y + coord.height / 2;
        return `rotate(-45 ${x} ${y})`;
      })
      .style('text-anchor', 'end');
  }
}

export default CancerBiomarkersDetails;
