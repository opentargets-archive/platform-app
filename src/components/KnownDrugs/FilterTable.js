import React from 'react';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import * as d3 from 'd3';
import { lighten } from 'polished';

import DCContainer from '../DCContainer';
import { OtTableRF, DataDownloader } from 'ot-ui';
import classNames from 'classnames';
import {
  upReducerKeyCount,
  downReducerKeyCount,
} from '../../utils/crossfilterReducers';
import { generateComparatorFromAccessor } from '../../utils/comparators';
import * as dcconfig from '../config/dc.js';
import _ from 'lodash';

// Get list of options (i.e. drop-down content) for a column filter
// render formats the label (similar to renderCell for cells content)
const getColFilterOptions = (rows, accessor, render) => {
  return _.uniq(rows.map(row => accessor(row))).map(row => ({
    label: render ? render(row) : row,
    value: row,
  }));
};

// Define columns headers, how to sort, render and export the cells
const getColumns = ({ filters }) => {
  const cols = [
    {
      id: 'disease',
      label: 'Disease',
      renderCell: d => (
        <a href={'/disease/' + d.disease.id} rel="noopener noreferrer">
          {_.capitalize(d.disease.name)}
        </a>
      ),
      comparator: generateComparatorFromAccessor(d => d.disease.name),
      export: d => d.disease.name,
    },
    {
      id: 'phase',
      label: 'Phase',
      renderCell: d => d.clinicalTrial.phase,
      comparator: generateComparatorFromAccessor(d => d.clinicalTrial.phase),
      export: d => d.clinicalTrial.phase,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: d =>
        _.capitalize(d.clinicalTrial.status).replace(/_/g, ' ') || '-',
      comparator: generateComparatorFromAccessor(
        d => d.clinicalTrial.status || ''
      ),
      export: d => d.clinicalTrial.status,
    },
    {
      id: 'source',
      label: 'Source',
      renderCell: d => (
        <a
          href={d.clinicalTrial.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {d.clinicalTrial.sourceName}
        </a>
      ),
      comparator: generateComparatorFromAccessor(
        d => d.clinicalTrial.sourceName
      ),
      export: d => d.clinicalTrial.sourceName,
    },
    {
      id: 'drug',
      label: 'Drug',
      renderCell: d => (
        <a href={'/drug/' + d.drug.id} rel="noopener noreferrer">
          {_.capitalize(d.drug.name)}
        </a>
      ),
      comparator: generateComparatorFromAccessor(d => d.drug.name),
      export: d => d.drug.name,
    },
    {
      id: 'type',
      label: 'Type',
      renderCell: d =>
        _(d.drug.type)
          .capitalize()
          .replace(/_/g, ' '),
      comparator: generateComparatorFromAccessor(d => d.drug.type),
      export: d => d.drug.type,
    },
    {
      id: 'mechanism',
      label: 'Mechanism of Action',
      renderCell: d => (
        <React.Fragment>
          {d.mechanismOfAction.name}
          <br />
          <a
            href={d.mechanismOfAction.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {d.mechanismOfAction.sourceName}
          </a>
        </React.Fragment>
      ),
      comparator: generateComparatorFromAccessor(
        d => d.mechanismOfAction.sourceName
      ),
      export: d => d.mechanismOfAction.name,
    },
    {
      id: 'activity',
      label: 'Activity',
      renderCell: d => _.capitalize(d.drug.activity).replace(/_/g, ' '),
      comparator: generateComparatorFromAccessor(d => d.drug.activity),
      export: d => d.drug.activity,
    },
    {
      id: 'target',
      label: 'Target',
      renderCell: d => d.target.symbol,
      comparator: generateComparatorFromAccessor(d => d.target.symbol),
      export: d => d.target.symbol,
    },
  ];

  // setup column filters (if any) for each col required
  if (filters) {
    cols.forEach(c => {
      if (filters[c.id]) {
        const f = filters[c.id];
        c.renderFilter = d => (
          <Select
            isClearable
            options={f.options}
            onChange={f.handler}
            placeholder="None"
          />
        );
      }
    });
  }
  return cols;
};

const {
  DC_PIE_INNER_RADIUS,
  DC_PIE_OUTER_RADIUS,
  DC_PIE_WIDTH,
  DC_PIE_HEIGHT,
  DC_COUNTLABEL_SIZE,
  DC_COLORS,
} = dcconfig;

const styles = theme => ({
  modalContainer: {
    overflow: 'auto',
  },
  modalContents: {
    width: '90%',
    margin: '0 auto',
  },
  dcChartContainer: {
    padding: '8px',
    marginTop: '20px',
  },
  dcChartSection: {
    float: 'left',
    margin: '20px 20px 0 0',
  },
  countLabel: {
    fontWeight: 'bold',
    padding: '8px 0px',
    borderRadius: '50%',
    color: DC_COLORS.WHITE,
    width: `${DC_COUNTLABEL_SIZE}px`,
    height: `${DC_COUNTLABEL_SIZE}px`,
    display: 'inline-block',
    textAlign: 'center',
  },
  countLabelDrug: {
    backgroundColor: DC_COLORS.GREEN,
  },
  countLabelTarget: {
    backgroundColor: DC_COLORS.PURPLE,
  },
  countLabelDisease: {
    backgroundColor: DC_COLORS.ORANGE,
  },
  countLabelTrials: {
    backgroundColor: DC_COLORS.BLUE_BRAND,
  },
});

// Get the colours for pie chart slices.
// Ideally this kinda thing will be replaced by a d3 scale of some sort?
const getPieColors = items => {
  return items.reduce((acc, item, i) => {
    acc[item] = lighten(0.1 * i, DC_COLORS.LIGHT_PURPLE);
    return acc;
  }, {});
};

class KnownDrugsDetail extends React.Component {
  state = {
    filteredRows: [],
  };

  // setup xfilter
  drugsxf = crossfilter(this.props.rows);

  // dimensions
  dimPhase = this.drugsxf.dimension(d => d.clinicalTrial.phase);
  dimActivity = this.drugsxf.dimension(d => d.drug.activity);
  dimType = this.drugsxf.dimension(d => d.drug.type);
  dimDisease = this.drugsxf.dimension(d => d.disease.name);
  dimStatus = this.drugsxf.dimension(d => d.clinicalTrial.status);
  dimSource = this.drugsxf.dimension(d => d.clinicalTrial.sourceName);
  dimDrug = this.drugsxf.dimension(d => d.drug.name);
  dimMechanism = this.drugsxf.dimension(d => d.mechanismOfAction.name);

  // Setup a colum filter handler based on the specified dimension
  getColFilterHandler = dim => {
    return selection => {
      if (selection) {
        dim.filter(d => d === selection.value);
      } else {
        dim.filterAll();
      }

      this.setState({
        filteredRows: this.drugsxf.allFiltered(),
      });
    };
  };

  reduceGroup = (group, accessor) => {
    return group.reduce(
      upReducerKeyCount(accessor),
      downReducerKeyCount(accessor),
      () => ({})
    );
  };

  // setup crossfilter grouping
  setupGroups = () => {
    const drugAccessor = d => d.drug.name;
    this.drugCount = this.reduceGroup(this.drugsxf.groupAll(), drugAccessor);

    this.targetCount = this.reduceGroup(
      this.drugsxf.groupAll(),
      d => d.target.id
    );

    this.diseaseCount = this.reduceGroup(
      this.drugsxf.groupAll(),
      d => d.disease.id
    );

    this.trialCount = this.reduceGroup(
      this.drugsxf.groupAll(),
      d => d.clinicalTrial.sourceUrl
    );

    this.groupTrialByPhase = this.reduceGroup(
      this.dimPhase.group(),
      d => d.clinicalTrial.sourceUrl
    );

    this.groupDrugByType = this.reduceGroup(this.dimType.group(), drugAccessor);

    this.groupDrugByActivity = this.reduceGroup(
      this.dimActivity.group(),
      drugAccessor
    );
  };

  setupCharts = () => {
    // charts
    this.drugCountLabel = dc.numberDisplay('#unique-drugs-count');
    this.targetsCountLabel = dc.numberDisplay('#associated-targets-count');
    this.diseasesCountLabel = dc.numberDisplay('#associated-diseases-count');
    this.trialsCountLabel = dc.numberDisplay('#clinical-trials-count');

    this.chartTrialByPhase = dc.barChart('#dc-trial-by-phase-chart');
    this.chartDrugByType = dc.pieChart('#dc-drug-by-type-chart');
    this.chartDrugByActivity = dc.pieChart('#dc-drug-by-activity-chart');

    // summary count charts
    this.drugCountLabel
      .group(this.drugCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length);

    this.targetsCountLabel
      .group(this.targetCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length);

    this.diseasesCountLabel
      .group(this.diseaseCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length);

    this.trialsCountLabel
      .group(this.trialCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length);

    // phase
    this.chartTrialByPhase // barchart version
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_HEIGHT)
      .valueAccessor(d => {
        return Object.keys(d.value).length;
      })
      .group(this.groupTrialByPhase)
      .dimension(this.dimPhase)
      .title(d => `Phase ${d.key}: ${Object.keys(d.value).length}`)
      .colors([DC_COLORS.PURPLE])
      .elasticX(true)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .barPadding(0.1)
      .outerPadding(0.05)
      .xAxisLabel('Phase');

    // type
    this.chartDrugByType
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_HEIGHT)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .dimension(this.dimType)
      .group(this.groupDrugByType)
      .valueAccessor(d => Object.keys(d.value).length)
      .label(
        d =>
          `${_(d.key)
            .capitalize()
            .replace(/_/g, ' ')} (${Object.keys(d.value).length})`
      )
      // .colorAccessor(d => d.key)
      .colors(k => this.typeColors[k]);

    // activity
    this.chartDrugByActivity
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_HEIGHT)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .dimension(this.dimActivity)
      .group(this.groupDrugByActivity)
      .valueAccessor(d => Object.keys(d.value).length)
      .label(
        d =>
          `${_(d.key)
            .capitalize()
            .replace(/_/g, ' ')} (${Object.keys(d.value).length})`
      )
      // .colorAccessor(d => d.value.length)
      .colors(k => this.activityColors[k]);

    dc.renderAll();

    // state for material table: initial
    this.setState({ filteredRows: this.drugsxf.allFiltered() });
    // state for material table: on chart filter
    const that = this;
    dc.chartRegistry.list().forEach(chart =>
      chart.on('filtered', () => {
        that.setState({ filteredRows: this.drugsxf.allFiltered() });
      })
    );
  };

  redrawCharts = () => {
    this.drugCountLabel.redraw();
    this.targetsCountLabel.redraw();
    this.diseasesCountLabel.redraw();
    this.chartTrialByPhase.redraw();
    this.chartDrugByType.redraw();
    this.chartDrugByActivity.redraw();
  };

  componentDidMount() {
    this.typeColors = getPieColors(
      _.uniq(this.props.rows.map(row => row.drug.type))
    );
    this.activityColors = getPieColors(
      _.uniq(this.props.rows.map(row => row.drug.activity))
    );
    this.setupGroups();
    this.setupCharts();
  }

  componentDidUpdate() {
    this.redrawCharts();
  }

  render() {
    const { classes, symbol, rows } = this.props;
    const { filteredRows } = this.state;
    // Setup filters for the columns that require it; cols identified by ID
    // options = array of {label, value} to populate filter dropdown; handler: on-select callback
    const colFilters = {
      disease: {
        options: getColFilterOptions(
          filteredRows,
          row => row.disease.name,
          label => _(label).capitalize()
        ),
        handler: this.getColFilterHandler(this.dimDisease),
      },
      phase: {
        options: getColFilterOptions(
          filteredRows,
          row => row.clinicalTrial.phase
        ),
        handler: this.getColFilterHandler(this.dimPhase),
      },
      status: {
        options: getColFilterOptions(
          filteredRows,
          row => row.clinicalTrial.status,
          label =>
            _(label || '-')
              .capitalize()
              .replace(/_/g, ' ')
        ),
        handler: this.getColFilterHandler(this.dimStatus),
      },
      source: {
        options: getColFilterOptions(
          filteredRows,
          row => row.clinicalTrial.sourceName
        ),
        handler: this.getColFilterHandler(this.dimSource),
      },
      drug: {
        options: getColFilterOptions(
          filteredRows,
          row => row.drug.name,
          label => _(label).capitalize()
        ),
        handler: this.getColFilterHandler(this.dimDrug),
      },
      type: {
        options: getColFilterOptions(
          filteredRows,
          row => row.drug.type,
          label =>
            _(label)
              .capitalize()
              .replace(/_/g, ' ')
        ),
        handler: this.getColFilterHandler(this.dimType),
      },
      mechanism: {
        options: getColFilterOptions(
          filteredRows,
          row => row.mechanismOfAction.name,
          label =>
            _(label)
              .capitalize()
              .replace(/_/g, ' ')
        ),
        handler: this.getColFilterHandler(this.dimMechanism),
      },
      activity: {
        options: getColFilterOptions(
          filteredRows,
          row => row.drug.activity,
          label =>
            _(label)
              .capitalize()
              .replace(/_/g, ' ')
        ),
        handler: this.getColFilterHandler(this.dimActivity),
      },
    };

    return (
      <React.Fragment>
        <div className={classes.dcChartContainer}>
          <div className={classes.dcChartSection}>
            <strong>Summary</strong>
            <p>
              <span
                id="unique-drugs-count"
                className={classNames(
                  classes.countLabel,
                  classes.countLabelDrug
                )}
              />{' '}
              unique drugs
            </p>
            <p>
              <span
                id="associated-targets-count"
                className={classNames(
                  classes.countLabel,
                  classes.countLabelTarget
                )}
              />{' '}
              associated targets
            </p>
            <p>
              <span
                id="associated-diseases-count"
                className={classNames(
                  classes.countLabel,
                  classes.countLabelDisease
                )}
              />{' '}
              associated diseases
            </p>
            <p>
              <span
                id="clinical-trials-count"
                className={classNames(
                  classes.countLabel,
                  classes.countLabelTrials
                )}
              />{' '}
              clinical trials
            </p>
            <div className="clearfix" />
          </div>

          <div className={classes.dcChartSection}>
            <DCContainer
              id="dc-trial-by-phase-chart"
              title="Clinical trials by phase"
            />
          </div>
          <div className={classes.dcChartSection}>
            <DCContainer
              id="dc-drug-by-type-chart"
              title="Unique drugs by type"
            />
          </div>
          <div className={classes.dcChartSection}>
            <DCContainer
              id="dc-drug-by-activity-chart"
              title="Unique drugs by activity"
            />
          </div>
        </div>
        <DataDownloader
          tableHeaders={getColumns({})}
          rows={filteredRows}
          fileStem={`${symbol}-knowndrugs`}
        />
        <OtTableRF
          columns={getColumns({ filters: colFilters })}
          data={filteredRows}
          filters
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(KnownDrugsDetail);
