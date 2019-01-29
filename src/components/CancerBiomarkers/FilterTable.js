import React, { Component, Fragment } from 'react';
import crossfilter from 'crossfilter2';
import * as d3 from 'd3';
import dc from 'dc';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
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
  countLabelSection: {
    width: DC_PIE_WIDTH,
    float: 'left',
  },
  countLabel: {
    fontWeight: 'bold',
    padding: '8px',
    borderRadius: '50%',
    color: '#FFF',
    width: '36px',
    height: '36px',
    display: 'inline-block',
    textAlign: 'center',
  },
  countLabelDrug: {
    backgroundColor: '#38954C',
  },
  countLabelBiomarker: {
    backgroundColor: '#7b196a',
  },
  countLabelDisease: {
    backgroundColor: '#d36141',
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
        <div className={classes.countLabelSection}>
          <strong>Summary</strong>
          <p>
            <span
              id="biomarkers-drug-count"
              className={classNames(classes.countLabel, classes.countLabelDrug)}
            />{' '}
            drugs (or drug families)
          </p>
          <p>
            <span
              id="biomarkers-biomarker-count"
              className={classNames(
                classes.countLabel,
                classes.countLabelBiomarker
              )}
            />{' '}
            biomarkers
          </p>
          <p>
            <span
              id="biomarkers-disease-count"
              className={classNames(
                classes.countLabel,
                classes.countLabelDisease
              )}
            />{' '}
            diseases
          </p>
          <div className="clearfix" />
        </div>
        <DCContainer id="biomarkers-by-association" title="Association" />
        <DCContainer id="biomarkers-by-evidence" title="Evidence" />
        <OtTable columns={columns} data={filteredRows} />
      </Fragment>
    );
  }

  renderCharts() {
    const { rows } = this.props;

    const biomarkers = crossfilter(rows);
    const associationDim = biomarkers.dimension(row => row.associationType);
    const evidenceDim = biomarkers.dimension(row => row.evidenceLevel);

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

    const associationGroup = associationDim.group().reduce(
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

    const evidenceGroup = evidenceDim.group().reduce(
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

    const drugCountLabel = dc.numberDisplay('#biomarkers-drug-count');
    const biomarkerCountLabel = dc.numberDisplay('#biomarkers-biomarker-count');
    const diseaseCountLabel = dc.numberDisplay('#biomarkers-disease-count');
    const biomarkersByAssociationChart = dc.pieChart(
      '#biomarkers-by-association'
    );
    const biomarkersByEvidenceChart = dc.pieChart('#biomarkers-by-evidence');

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

    biomarkersByAssociationChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value).length)
      .group(associationGroup)
      .dimension(associationDim)
      .colors(['#E2DFDF'])
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
      .group(evidenceGroup)
      .dimension(evidenceDim)
      .colors(['#E2DFDF'])
      .render();

    biomarkersByEvidenceChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    this.setState({ filteredRows: biomarkers.allFiltered() });
  }
}

export default withStyles(styles)(FilterTable);
