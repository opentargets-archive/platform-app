import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import * as d3 from 'd3';

import DCContainer from '../DCContainer';
import { OtTable } from 'ot-ui';
import classNames from 'classnames';
import {
  upReducerKeyCount,
  downReducerKeyCount,
} from '../../utils/crossfilterReducers';
import { generateComparatorFromAccessor } from '../../utils/comparators';
import * as dcconfig from '../config/dc.js';

const columns = [
  {
    id: 'disease',
    label: 'Disease',
    renderCell: d => d.disease.name,
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
    renderCell: d => d.clinicalTrial.status,
    comparator: generateComparatorFromAccessor(d => d.clinicalTrial.status),
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
    comparator: generateComparatorFromAccessor(d => d.clinicalTrial.sourceName),
    export: d => d.clinicalTrial.sourceName,
  },
  {
    id: 'drug',
    label: 'Drug',
    renderCell: d => d.drug.name,
    comparator: generateComparatorFromAccessor(d => d.drug.name),
    export: d => d.drug.name,
  },
  {
    id: 'type',
    label: 'Type',
    renderCell: d => d.drug.type,
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
    renderCell: d => d.drug.activity,
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
});

class KnownDrugsDetail extends React.Component {
  state = {
    filteredRows: [],
  };
  componentDidMount() {
    this.renderCharts();
  }
  render() {
    const { classes, symbol } = this.props;
    const { filteredRows } = this.state;
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
        <OtTable
          loading={false}
          error={null}
          columns={columns}
          data={filteredRows}
          tableLayout="fixed"
          downloadFileStem={symbol + '_knowndrugs'}
        />
      </React.Fragment>
    );
  }

  renderCharts = () => {
    const { rows } = this.props;

    // connect
    const drugsxf = crossfilter(rows);

    // dimensions
    const dimPhase = drugsxf.dimension(d => d.clinicalTrial.phase);
    const dimActivity = drugsxf.dimension(d => d.drug.activity);
    const dimType = drugsxf.dimension(d => d.drug.type);

    // groups
    const drugAccessor = d => d.drug.name;
    const drugCount = drugsxf
      .groupAll()
      .reduce(
        upReducerKeyCount(drugAccessor),
        downReducerKeyCount(drugAccessor),
        () => ({})
      );

    const targetAccessor = d => d.target.id;
    const targetCount = drugsxf
      .groupAll()
      .reduce(
        upReducerKeyCount(targetAccessor),
        downReducerKeyCount(targetAccessor),
        () => ({})
      );

    const diseaseAccessor = d => d.disease.id;
    const diseaseCount = drugsxf
      .groupAll()
      .reduce(
        upReducerKeyCount(diseaseAccessor),
        downReducerKeyCount(diseaseAccessor),
        () => ({})
      );

    const phaseAccessor = d => d.clinicalTrial.sourceUrl;
    const groupTrialByPhase = dimPhase
      .group()
      .reduce(
        upReducerKeyCount(phaseAccessor),
        downReducerKeyCount(phaseAccessor),
        () => ({})
      );

    const groupDrugByType = dimType
      .group()
      .reduce(
        upReducerKeyCount(drugAccessor),
        downReducerKeyCount(drugAccessor),
        () => ({})
      );

    const groupDrugByActivity = dimActivity
      .group()
      .reduce(
        upReducerKeyCount(drugAccessor),
        downReducerKeyCount(drugAccessor),
        () => ({})
      );

    // charts
    const drugCountLabel = dc.numberDisplay('#unique-drugs-count');
    const targetsCountLabel = dc.numberDisplay('#associated-targets-count');
    const diseasesCountLabel = dc.numberDisplay('#associated-diseases-count');

    const chartTrialByPhase = dc.barChart('#dc-trial-by-phase-chart');
    const chartDrugByType = dc.pieChart('#dc-drug-by-type-chart');
    const chartDrugByActivity = dc.pieChart('#dc-drug-by-activity-chart');

    // summary count charts
    drugCountLabel
      .group(drugCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    targetsCountLabel
      .group(targetCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    diseasesCountLabel
      .group(diseaseCount)
      .formatNumber(d3.format('d'))
      .valueAccessor(d => Object.keys(d).length)
      .render();

    // phase
    chartTrialByPhase // barchart version
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_HEIGHT)
      .valueAccessor(d => {
        return Object.keys(d.value).length;
      })
      .group(groupTrialByPhase)
      .dimension(dimPhase)
      .title(d => `Phase ${d.key}: ${Object.keys(d.value).length}`)
      .colors([DC_COLORS.PURPLE])
      .elasticX(true)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .barPadding(0.1)
      .outerPadding(0.05)
      .xAxisLabel('Phase');

    // type
    chartDrugByType
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_HEIGHT)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .dimension(dimType)
      .group(groupDrugByType)
      .valueAccessor(d => Object.keys(d.value).length)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .colorAccessor(d => d.key)
      .colors([DC_COLORS.GREY]);

    // activity
    chartDrugByActivity
      .width(DC_PIE_WIDTH)
      .height(DC_PIE_HEIGHT)
      .radius(DC_PIE_OUTER_RADIUS)
      .innerRadius(DC_PIE_INNER_RADIUS)
      .dimension(dimActivity)
      .group(groupDrugByActivity)
      .valueAccessor(d => Object.keys(d.value).length)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .colorAccessor(d => d.key)
      .colors([DC_COLORS.GREY]);

    dc.renderAll();

    // state for material table: initial
    this.setState({ filteredRows: drugsxf.allFiltered() });

    // state for material table: on chart filter
    const that = this;
    dc.chartRegistry.list().forEach(chart =>
      chart.on('filtered', () => {
        that.setState({ filteredRows: drugsxf.allFiltered() });
      })
    );
  };
}

export default withStyles(styles)(KnownDrugsDetail);
