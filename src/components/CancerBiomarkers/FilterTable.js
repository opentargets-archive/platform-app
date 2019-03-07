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

import {
  DC_PIE_INNER_RADIUS,
  DC_PIE_OUTER_RADIUS,
  DC_PIE_WIDTH,
} from './../config/dc';

const getColumns = ({
  biomarkerOptions,
  drugOptions,
  associationOptions,
  evidenceOptions,
  biomarkerFilterHandler,
  drugFilterHandler,
  associationFilterHandler,
  evidenceFilterHandler,
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
          placeholder="None"
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
      renderFilter: () => (
        <Select
          isClearable
          options={drugOptions}
          onChange={drugFilterHandler}
          placeholder="None"
        />
      ),
    },
    {
      id: 'associationType',
      label: 'Association',
      renderFilter: () => (
        <Select
          isClearable
          options={associationOptions}
          onChange={associationFilterHandler}
          placeholder="None"
        />
      ),
    },
    {
      id: 'evidenceLevel',
      label: 'Evidence',
      renderFilter: () => (
        <Select
          isClearable
          options={evidenceOptions}
          onChange={evidenceFilterHandler}
          placeholder="None"
        />
      ),
    },
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

const getAssociationOptions = rows => {
  return _.uniq(rows.map(row => row.associationType)).map(row => ({
    label: row,
    value: row,
  }));
};

const getEvidenceOptions = rows => {
  return _.uniq(rows.map(row => row.evidenceLevel)).map(row => ({
    label: row,
    value: row,
  }));
};

class FilterTable extends Component {
  state = {};

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
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
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

  biomarkerFilterHandler = selection => {
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

  drugFilterHandler = selection => {
    const { biomarkers, drugDim } = this.state;
    if (selection) {
      drugDim.filter(d => d === selection.value);
    } else {
      drugDim.filterAll();
    }

    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  associationFilterHandler = selection => {
    const { biomarkers, associationDim } = this.state;
    if (selection) {
      associationDim.filter(d => d === selection.value);
    } else {
      associationDim.filterAll();
    }

    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  evidenceFilterHandler = selection => {
    const { biomarkers, evidenceDim } = this.state;
    if (selection) {
      evidenceDim.filter(d => d === selection.value);
    } else {
      evidenceDim.filterAll();
    }
    this.setState({ filteredRows: biomarkers.allFiltered() });
  };

  static getDerivedStateFromProps(props, state) {
    const prevProps = state.prevProps || {};

    if (props.rows !== prevProps.rows) {
      // only create a new crossfilter, groups, and dimensions
      // when the rows prop has changed
      const biomarkers = crossfilter(props.rows);
      const biomarkerDim = biomarkers.dimension(row => row.biomarker);
      const drugDim = biomarkers.dimension(row => row.drugName);
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
        prevProps: props,
        filteredRows: biomarkers.allFiltered(),
        biomarkers,
        biomarkerDim,
        biomarkerCount,
        drugDim,
        drugCount,
        diseaseCount,
        associationDim,
        associationGroup,
        evidenceDim,
        evidenceGroup,
      };
    }

    return null;
  }

  componentDidMount() {
    this.setupCharts();
  }

  componentDidUpdate() {
    this.redrawCharts();
  }

  render() {
    const { symbol, classes } = this.props;
    const { filteredRows } = this.state;

    const biomarkerOptions = getBiomarkerOptions(filteredRows);
    const drugOptions = getDrugOptions(filteredRows);
    const associationOptions = getAssociationOptions(filteredRows);
    const evidenceOptions = getEvidenceOptions(filteredRows);

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
            associationOptions,
            evidenceOptions,
            biomarkerFilterHandler: this.biomarkerFilterHandler,
            drugFilterHandler: this.drugFilterHandler,
            associationFilterHandler: this.associationFilterHandler,
            evidenceFilterHandler: this.evidenceFilterHandler,
          })}
          data={filteredRows}
          filters
          downloadFileStem={`${symbol}-cancer-biomarkers`}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(FilterTable);
