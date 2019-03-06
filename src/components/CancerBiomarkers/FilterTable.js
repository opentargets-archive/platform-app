import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import _ from 'lodash';
import * as d3 from 'd3';
import dc from 'dc';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { OtTable } from 'ot-ui';

import DCContainer from '../DCContainer';
import {
  upReducerKeyCount,
  downReducerKeyCount,
} from '../../utils/crossfilterReducers';

const getColumns = ({
  biomarkerOptions,
  drugOptions,
  biomarkerFilterHandler,
  drugsFilterHandler,
}) => {
  return [
    {
      id: 'biomarker',
      label: 'Biomarker',
      renderFilter: () => (
        <Select
          isClearable
          options={biomarkerOptions}
          onChange={biomarkerFilterHandler}
        />
      ),
    },
    {
      id: 'diseases',
      label: 'Disease',
      renderCell: rowData => {
        return rowData.diseases.map(disease => disease.name).join(', ');
      },
    },
    {
      id: 'drugName',
      label: 'Drug',
    },
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
};

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

const getBiomarkerOptions = rows => {
  return _.uniq(rows.map(row => row.biomarker)).map(row => ({
    label: row,
    value: row,
  }));
};

const getDrugOptions = rows => {
  return _.uniq(rows.map(row => row.drugName)).map(row => ({
    label: row,
    value: row,
  }));
};

class FilterTable extends Component {
  state = {
    filteredRows: [],
  };

  setupCharts() {
    // set up DC charts, not crossfilter stuff
    this.drugCountLabel = dc.numberDisplay('#biomarkers-drug-count');
    this.biomarkerCountLabel = dc.numberDisplay('#biomarkers-biomarker-count');
    this.diseaseCountLabel = dc.numberDisplay('#biomarkers-disease-count');
    this.biomarkersByAssociationChart = dc.pieChart(
      '#biomarkers-by-association'
    );
    this.biomarkersByEvidenceChart = dc.pieChart('#biomarkers-by-evidence');

    const {
      biomarkers,
      drugCount,
      biomarkerCount,
      diseaseCount,
      associationDim,
      associationGroup,
      evidenceDim,
      evidenceGroup,
    } = this.state;

    this.drugCountLabel
      .group(drugCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    this.biomarkerCountLabel
      .group(biomarkerCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    this.diseaseCountLabel
      .group(diseaseCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    this.biomarkersByAssociationChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .valueAccessor(d => Object.keys(d.value).length)
      .dimension(associationDim)
      .group(associationGroup)
      .colors(['#E2DFDF'])
      .render();

    this.biomarkersByEvidenceChart
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_WIDTH)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .label(d => `${d.key} (${Object.keys(d.value).length}`)
      .valueAccessor(d => Object.keys(d.value).length)
      .dimension(evidenceDim)
      .group(evidenceGroup)
      .colors(['#E2DFDF'])
      .render();

    this.biomarkersByAssociationChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });

    this.biomarkersByEvidenceChart.on('filtered', d => {
      this.setState({ filteredRows: biomarkers.allFiltered() });
    });
  }

  redrawCharts() {
    this.drugCountLabel.redraw();
    this.biomarkerCountLabel.redraw();
    this.diseaseCountLabel.redraw();
    this.biomarkersByAssociationChart.redraw();
    this.biomarkersByEvidenceChart.redraw();
  }

  componentDidMount() {
    this.setupCharts();
  }

  componentDidUpdate() {
    this.redrawCharts();
  }

  biomarkerFilterHandler = (selection, a) => {
    const { biomarkers, biomarkerDim } = this.state;
    if (selection) {
      biomarkerDim.filter(d => d === selection.value);
    } else {
      // if the selection has been cleared, clear any filters on the
      // biomarkersDim dimension
      biomarkerDim.filterAll();
    }

    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  static getDerivedStateFromProps(props, state) {
    const { rows } = props;

    if (!state.biomarkers) {
      const biomarkers = crossfilter(rows);
      const biomarkerDim = biomarkers.dimension(row => row.biomarker);
      const drugsDim = biomarkers.dimension(row => row.drugName);
      const associationDim = biomarkers.dimension(row => row.associationType);
      const evidenceDim = biomarkers.dimension(row => row.evidenceLevel);

      const drugAccessor = data => data.drugName;
      const biomarkerAccessor = data => data.biomarker;

      const drugCount = biomarkers
        .groupAll()
        .reduce(
          upReducerKeyCount(drugAccessor),
          downReducerKeyCount(drugAccessor),
          () => ({})
        );

      const biomarkerCount = biomarkers
        .groupAll()
        .reduce(
          upReducerKeyCount(biomarkerAccessor),
          downReducerKeyCount(biomarkerAccessor),
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

      const associationGroup = associationDim
        .group()
        .reduce(
          upReducerKeyCount(biomarkerAccessor),
          downReducerKeyCount(biomarkerAccessor),
          () => ({})
        );

      const evidenceGroup = evidenceDim
        .group()
        .reduce(
          upReducerKeyCount(biomarkerAccessor),
          downReducerKeyCount(biomarkerAccessor),
          () => ({})
        );

      return {
        filteredRows: biomarkers.allFiltered(),
        biomarkers,
        biomarkerDim,
        drugCount,
        biomarkerCount,
        diseaseCount,
        associationDim,
        associationGroup,
        evidenceDim,
        evidenceGroup,
      };
    } else {
      return null;
    }
  }

  render() {
    const { classes } = this.props;
    const { filteredRows } = this.state;

    const biomarkerOptions = getBiomarkerOptions(filteredRows);
    const drugOptions = getDrugOptions(filteredRows);

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
        <OtTable
          columns={getColumns({
            biomarkerOptions,
            drugOptions,
            biomarkerFilterHandler: this.biomarkerFilterHandler,
            drugsFilterHandler: this.drugsFilterHandler,
          })}
          data={filteredRows}
          filters
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(FilterTable);
