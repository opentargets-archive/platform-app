import React, { Component, Fragment } from 'react';
import crossfilter from 'crossfilter2';
import * as d3 from 'd3';
import dc from 'dc';
import withStyles from '@material-ui/core/styles/withStyles';
import { OtTable } from 'ot-ui';

import DCContainer from '../DCContainer';

const columns = [
  { id: 'biomarker', label: 'Biomarker' },
  {
    id: 'diseases',
    label: 'Disease',
    renderCell: rowData => {
      return rowData.diseases.map(disease => disease.name).join(', ');
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
          {source.name}
        </a>
      ));
      return result;
    },
  },
];

const DC_PIE_INNER_RADIUS = 40;
const DC_PIE_OUTER_RADIUS = 100;
const DC_PIE_WIDTH = 220;

const styles = theme => ({
  countLabel: {
    width: DC_PIE_WIDTH,
    float: 'left',
  },
});

class FilterTable extends Component {
  state = {
    filteredRows: [],
  };

  componentDidMount() {
    this.renderCharts();
  }

  render() {
    const { classes } = this.props;
    const { filteredRows } = this.state;

    return (
      <Fragment>
        <div className={classes.countLabel}>
          <strong>Summary</strong>
          <p>
            <span id="biomarkers-drug-count" /> drugs (or drug families)
          </p>
          <p>
            <span id="biomarkers-biomarker-count" /> biomarkers
          </p>
          <p>
            <span id="biomarkers-disease-count" /> diseases
          </p>
          <div className="clearfix" />
        </div>
        {/* <DCContainer id="biomarkers-by-drug" title="Biomarkers by drug" /> */}
        <DCContainer
          id="biomarkers-by-association"
          title="Biomarkers by association"
        />
        <DCContainer
          id="biomarkers-by-evidence"
          title="Biomarkers by evidence"
        />
        {/* <DCContainer
          id="biomarkers-drugs-heatmap"
          title="Biomarkers and drugs"
        /> */}
        <OtTable columns={columns} data={filteredRows} />
      </Fragment>
    );
  }

  renderCharts() {
    const { rows } = this.props;

    const biomarkers = crossfilter(rows);

    const biomarkersByAssociation = biomarkers.dimension(
      d => d.associationType
    );
    const biomarkersByEvidence = biomarkers.dimension(d => d.evidenceLevel);
    // const biomarkerAndDrug = biomarkers.dimension(d => [
    //   d.biomarker,
    //   d.drugName,
    // ]);

    // const biomarkersByDrugGroup = biomarkersByDrug.group().reduce(
    //   (acc, data) => {
    //     if (data.biomarker in acc) {
    //       acc[data.biomarker]++;
    //     } else {
    //       acc[data.biomarker] = 1;
    //     }
    //     return acc;
    //   },
    //   (acc, data) => {
    //     acc[data.biomarker]--;
    //     if (acc[data.biomarker] === 0) {
    //       delete acc[data.biomarker];
    //     }
    //     return acc;
    //   },
    //   () => ({})
    // );

    const drugCount = biomarkers.groupAll().reduce(
      (acc, data) => {
        if (data.drugName in acc) {
          acc[data.drugName]++;
        } else {
          acc[data.drugName] = 1;
        }
        return acc;
      },
      (acc, data) => {
        acc[data.drugName]--;
        if (acc[data.drugName] === 0) {
          delete acc[data.drugName];
        }
        return acc;
      },
      () => ({})
    );
    const biomarkerCount = biomarkers.groupAll().reduce(
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

    const diseaseCount = biomarkers.groupAll().reduce(
      (acc, data) => {
        data.diseases.forEach(d => {
          if (d.name in acc) {
            acc[d.name]++;
          } else {
            acc[d.name] = 1;
          }
        });
        return acc;
      },
      (acc, data) => {
        data.diseases.forEach(d => {
          acc[d.name]--;
          if (acc[d.name] === 0) {
            delete acc[d.name];
          }
        });
        return acc;
      },
      () => ({})
    );
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

    // const biomarkerAndDrugGroup = biomarkerAndDrug.group().reduceCount();

    const drugCountLabel = dc.numberDisplay('#biomarkers-drug-count');
    const biomarkerCountLabel = dc.numberDisplay('#biomarkers-biomarker-count');
    const diseaseCountLabel = dc.numberDisplay('#biomarkers-disease-count');
    // const biomarkersByDrugChart = dc.rowChart('#biomarkers-by-drug');
    const biomarkersByAssociationChart = dc.pieChart(
      '#biomarkers-by-association'
    );
    const biomarkersByEvidenceChart = dc.pieChart('#biomarkers-by-evidence');
    // const biomarkersDrugsHeatmap = dc.heatMap('#biomarkers-drugs-heatmap');

    drugCountLabel
      .group(drugCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    biomarkerCountLabel
      .group(biomarkerCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    diseaseCountLabel
      .group(diseaseCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    // biomarkersByDrugChart
    //   .width(280)
    //   .height(280)
    //   .margins({ top: 20, left: 10, right: 10, bottom: 20 })
    //   .label(d => d.key)
    //   .valueAccessor(d => Object.keys(d.value).length)
    //   .group(biomarkersByDrugGroup)
    //   .dimension(biomarkersByDrug)
    //   .xAxis();

    // biomarkersByDrugChart.render();

    // biomarkersByDrugChart.on('filtered', d => {
    //   this.setState({ filteredRows: biomarkers.allFiltered() });
    // });

    biomarkersByAssociationChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value).length)
      .group(biomarkersByAssociationGroup)
      .dimension(biomarkersByAssociation)
      .render();

    biomarkersByAssociationChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    biomarkersByEvidenceChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value).length)
      .group(biomarkersByEvidenceGroup)
      .dimension(biomarkersByEvidence)
      .render();

    biomarkersByEvidenceChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    // biomarkersDrugsHeatmap
    //   .width(380)
    //   .height(450)
    //   .margins({ top: 20, left: 200, right: 10, bottom: 150 })
    //   .dimension(biomarkerAndDrug)
    //   .group(biomarkerAndDrugGroup)
    //   .keyAccessor(d => d.key[0])
    //   .valueAccessor(d => d.key[1])
    //   .colorAccessor(d => {
    //     return d.value > 0 ? 1 : 0;
    //   })
    //   .colors(
    //     d3
    //       .scaleOrdinal()
    //       .domain([0, 1])
    //       .range(['#ccc', '#3182bd'])
    //   )
    //   .xBorderRadius(0)
    //   .yBorderRadius(0)
    //   .render();

    // biomarkersDrugsHeatmap.on('filtered', d => {
    //   this.setState({ filteredRows: biomarkers.allFiltered() });
    // });

    this.setState({
      filteredRows: biomarkers.allFiltered(),
    });

    // biomarkersDrugsHeatmap
    //   .selectAll('g.cols.axis > text')
    //   .attr('transform', function(d) {
    //     const coord = this.getBBox();
    //     const x = coord.x + coord.width / 2;
    //     const y = coord.y + coord.height / 2;
    //     return `rotate(-45 ${x} ${y})`;
    //   })
    //   .style('text-anchor', 'end');
  }
}

export default withStyles(styles)(FilterTable);
