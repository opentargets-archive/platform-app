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

const columns = [
  {
    id: 'disease',
    label: 'Disease',
    renderCell: d => d.disease.name,
    comparator: (a, b) =>
      a.disease.name > b.disease.name
        ? 1
        : a.disease.name === b.disease.name
        ? 0
        : -1,
  },
  {
    id: 'phase',
    label: 'Phase',
    renderCell: d => d.clinicalTrial.phase,
    comparator: (a, b) =>
      a.clinicalTrial.phase > b.clinicalTrial.phase
        ? 1
        : a.clinicalTrial.phase === b.clinicalTrial.phase
        ? 0
        : -1,
  },
  {
    id: 'status',
    label: 'Status',
    renderCell: d => d.clinicalTrial.status,
    comparator: (a, b) =>
      a.clinicalTrial.status > b.clinicalTrial.status
        ? 1
        : a.clinicalTrial.status === b.clinicalTrial.status
        ? 0
        : -1,
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
    comparator: (a, b) =>
      a.clinicalTrial.sourceName > b.clinicalTrial.sourceName
        ? 1
        : a.clinicalTrial.sourceName === b.clinicalTrial.sourceName
        ? 0
        : -1,
  },
  {
    id: 'drug',
    label: 'Drug',
    renderCell: d => d.drug.name,
    comparator: (a, b) =>
      a.drug.name > b.drug.name ? 1 : a.drug.name === b.drug.name ? 0 : -1,
  },
  {
    id: 'type',
    label: 'Type',
    renderCell: d => d.drug.type,
    comparator: (a, b) =>
      a.drug.type > b.drug.type ? 1 : a.drug.type === b.drug.type ? 0 : -1,
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
    comparator: (a, b) =>
      a.mechanismOfAction.sourceName > b.mechanismOfAction.sourceName
        ? 1
        : a.mechanismOfAction.sourceName === b.mechanismOfAction.sourceName
        ? 0
        : -1,
  },
  {
    id: 'activity',
    label: 'Activity',
    renderCell: d => d.drug.activity,
    comparator: (a, b) =>
      a.drug.activity > b.drug.activity
        ? 1
        : a.drug.activity === b.drug.activity
        ? 0
        : -1,
  },
  {
    id: 'target',
    label: 'Target',
    renderCell: d => d.target.symbol,
    comparator: (a, b) =>
      a.target.symbol > b.target.symbol
        ? 1
        : a.target.symbol === b.target.symbol
        ? 0
        : -1,
  },
];

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
    color: '#FFF',
    width: '36px',
    height: '36px',
    display: 'inline-block',
    textAlign: 'center',
  },
  countLabelDrug: {
    backgroundColor: '#38954C',
  },
  countLabelTarget: {
    backgroundColor: '#7b196a',
  },
  countLabelDisease: {
    backgroundColor: '#d36141',
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
    const { classes } = this.props;
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
        />
      </React.Fragment>
    );
  }

  renderCharts = () => {
    const { rows } = this.props;

    // connect
    const ndx = crossfilter(rows);

    // dimensions
    const dimPhase = ndx.dimension(d => d.clinicalTrial.phase);
    const dimActivity = ndx.dimension(d => d.drug.activity);
    const dimType = ndx.dimension(d => d.drug.type);

    // groups

    const drugAccessor = d => d.drug.name;
    const drugCount = ndx
      .groupAll()
      .reduce(
        upReducerKeyCount(drugAccessor),
        downReducerKeyCount(drugAccessor),
        () => ({})
      );

    const targetAccessor = d => d.target.id;
    const targetCount = ndx
      .groupAll()
      .reduce(
        upReducerKeyCount(targetAccessor),
        downReducerKeyCount(targetAccessor),
        () => ({})
      );

    const diseaseAccessor = d => d.disease.id;
    const diseaseCount = ndx
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

    // heatmap stuff
    // const activityMap = {
    //   AGONIST: 'agonist',
    //   ANTAGONIST: 'antagonist',
    //   UP_OR_DOWN: 'upOrDown',
    // };

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
      .width(280)
      .height(240)
      .valueAccessor(d => {
        return Object.keys(d.value).length;
      })
      .group(groupTrialByPhase)
      .dimension(dimPhase)
      .title(d => `Phase ${d.key}: ${Object.keys(d.value).length}`)
      .colors(['#7B1A6A'])
      .elasticX(true)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .barPadding(0.1)
      .outerPadding(0.05)
      .xAxisLabel('Phase');

    // type
    chartDrugByType
      .width(280)
      .height(280)
      .radius(120)
      .innerRadius(30)
      .dimension(dimType)
      .group(groupDrugByType)
      .valueAccessor(d => Object.keys(d.value).length)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .colorAccessor(d => d.key)
      .colors(['#E2DFDF']);

    // activity
    chartDrugByActivity
      .width(280)
      .height(280)
      .radius(120)
      .innerRadius(30)
      .dimension(dimActivity)
      .group(groupDrugByActivity)
      .valueAccessor(d => Object.keys(d.value).length)
      .label(d => `${d.key} (${Object.keys(d.value).length})`)
      .colorAccessor(d => d.key)
      .colors(['#E2DFDF']);

    dc.renderAll();

    // state for material table: initial
    this.setState({ filteredRows: ndx.allFiltered() });

    // state for material table: on chart filter
    const that = this;
    dc.chartRegistry.list().forEach(chart =>
      chart.on('filtered', () => {
        that.setState({ filteredRows: ndx.allFiltered() });
      })
    );
  };
}

export default withStyles(styles)(KnownDrugsDetail);
