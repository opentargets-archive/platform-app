import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import _ from 'lodash';
import * as d3 from 'd3';

import DCContainer from './DCContainer';
import { OtTable } from 'ot-ui';

const columns = [
  {
    id: 'efoLabel',
    label: 'Disease',
  },
  { id: 'drugName', label: 'Drug' },
  {
    id: 'phase',
    label: 'Phase',
  },
  {
    id: 'status',
    label: 'Status',
  },
  { id: 'drugType', label: 'Type' },
  { id: 'mechanismOfAction', label: 'Mechanism of action' },
  { id: 'activity', label: 'Activity' },
  { id: 'targetSymbol', label: 'Target' },
  { id: 'targetClass', label: 'Target class' },
  { id: 'evidenceSource', label: 'Evidence curated from' },
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
  },
});

class KnownDrugsDetail extends React.Component {
  state = {
    filteredRows: [],
  };
  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.state.filteredRows);
    this.renderDC();
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
    // console.log(this.state.filteredRows)
    // this.renderDC();
  }
  render() {
    const { data, symbol, classes } = this.props;
    // const { filteredRows } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h2">
          Drugs in clinical trials or approved for {symbol}
        </Typography>
        <div className={classes.dcChartContainer}>
          <DCContainer id="dc-trial-by-status-chart" title="Trials by Status" />
          <DCContainer id="dc-trial-by-phase-chart" title="Trials by Phase" />
          <DCContainer id="dc-trial-by-drug-chart" title="Trials by Drug" />
          <DCContainer
            id="dc-drug-by-activity-chart"
            title="Drug by Activity"
          />
          <DCContainer
            id="dc-drug-and-disease-by-activity-chart"
            title="Activity by (Disease, Drug)"
          />
        </div>
        <OtTable
          loading={false}
          error={null}
          columns={columns}
          data={this.state.filteredRows}
        />
      </React.Fragment>
    );
  }
  renderDC = () => {
    const { data } = this.props;
    const { rows } = data.targetDetailDrugs;

    // connect
    const ndx = crossfilter(rows);

    // dimensions
    const dimStatus = ndx.dimension(d => d.status || 'UNKNOWN');
    const dimPhase = ndx.dimension(d => d.phase);
    const dimActivity = ndx.dimension(d => d.activity);
    const dimDrugAndDisease = ndx.dimension(d => [d.drugName, d.efoLabel]);
    const dimDrug = ndx.dimension(d => d.drugName);

    // expected counts - for testing
    console.log(
      'unique trials',
      _.uniqBy(data.targetDetailDrugs.rows, 'evidenceUrl').length
    );
    console.log(
      'unique phases',
      _.uniqBy(data.targetDetailDrugs.rows, 'phase').length
    );
    console.log(
      'unique statuses',
      _.uniqBy(data.targetDetailDrugs.rows, 'status').length
    );
    console.log(
      'trials by phase',
      _.uniqBy(
        data.targetDetailDrugs.rows.map(d => ({
          trialId: d.evidenceUrl,
          status: d.status,
          phase: d.phase,
        })),
        'trialId'
      ).reduce(
        (acc, d) => {
          acc[d.phase] += 1;
          return acc;
        },
        { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
      )
    );
    console.log(
      'trials by phase',
      _.uniqBy(
        data.targetDetailDrugs.rows.map(d => ({
          trialId: d.evidenceUrl,
          status: d.status || 'UNKNOWN',
          phase: d.phase,
        })),
        'trialId'
      ).reduce(
        (acc, d) => {
          acc[d.status] += 1;
          return acc;
        },
        data.trialStatus.enumValues.reduce(
          (acc, d) => {
            acc[d.name] = 0;
            return acc;
          },
          { UNKNOWN: 0 }
        )
      )
    );
    console.log(
      'trials by drug',
      _.uniqBy(
        data.targetDetailDrugs.rows.map(d => ({
          trialId: d.evidenceUrl,
          drugName: d.drugName,
        })),
        'trialId'
      ).reduce((acc, d) => {
        if (acc[d.drugName]) {
          acc[d.drugName] += 1;
        } else {
          acc[d.drugName] = 1;
        }
        return acc;
      }, {})
    );
    console.log(
      'drugs by activity',
      _.uniqBy(
        data.targetDetailDrugs.rows.map(d => ({
          activity: d.activity,
          drugName: d.drugName,
        })),
        'drugName'
      ).reduce((acc, d) => {
        if (acc[d.activity]) {
          acc[d.activity] += 1;
        } else {
          acc[d.activity] = 1;
        }
        return acc;
      }, {})
    );

    // groups
    const groupTrialByStatus = dimStatus.group().reduce(
      (p, d) => {
        if (d.evidenceUrl in p.trialCounts) {
          p.trialCounts[d.evidenceUrl] += 1;
        } else {
          p.trialCounts[d.evidenceUrl] = 1;
        }
        return p;
      },
      (p, d) => {
        p.trialCounts[d.evidenceUrl] -= 1;
        if (p.trialCounts[d.evidenceUrl] === 0) {
          delete p.trialCounts[d.evidenceUrl];
        }
        return p;
      },
      () => ({ trialCounts: {} })
    );
    const groupTrialByPhase = dimPhase.group().reduce(
      (p, d) => {
        if (d.evidenceUrl in p.trialCounts) {
          p.trialCounts[d.evidenceUrl] += 1;
        } else {
          p.trialCounts[d.evidenceUrl] = 1;
        }
        return p;
      },
      (p, d) => {
        p.trialCounts[d.evidenceUrl] -= 1;
        if (p.trialCounts[d.evidenceUrl] === 0) {
          delete p.trialCounts[d.evidenceUrl];
        }
        return p;
      },
      () => ({ trialCounts: {} })
    );
    const groupDrugBy = dimDrug.group().reduce(
      (p, d) => {
        if (d.phase in p.phaseCounts) {
          p.phaseCounts[d.phase] += 1;
        } else {
          p.phaseCounts[d.phase] = 1;
        }

        if (d.evidenceUrl in p.trialCounts) {
          p.trialCounts[d.evidenceUrl] += 1;
        } else {
          p.trialCounts[d.evidenceUrl] = 1;
        }

        return p;
      },
      (p, d) => {
        p.phaseCounts[d.phase] -= 1;
        if (p.phaseCounts[d.phase] === 0) {
          delete p.phaseCounts[d.phase];
        }

        p.trialCounts[d.evidenceUrl] -= 1;
        if (p.trialCounts[d.evidenceUrl] === 0) {
          delete p.trialCounts[d.evidenceUrl];
        }

        return p;
      },
      () => ({ phaseCounts: {}, trialCounts: {} })
    );
    const activityMap = {
      AGONIST: 'agonist',
      ANTAGONIST: 'antagonist',
      UP_OR_DOWN: 'upOrDown',
    };
    const groupDrugByActivity = dimActivity.group().reduce(
      (p, d) => {
        if (d.drugName in p) {
          p[d.drugName] += 1;
        } else {
          p[d.drugName] = 1;
        }
        return p;
      },
      (p, d) => {
        p[d.drugName] -= 1;
        if (p[d.drugName] === 0) {
          delete p[d.drugName];
        }
        return p;
      },
      () => ({})
    );
    console.log(groupDrugByActivity.all());
    const groupDrugAndDiseaseByActivity = dimDrugAndDisease.group().reduce(
      (p, d) => {
        p[activityMap[d.activity]] += 1;
        return p;
      },
      (p, d) => {
        p[activityMap[d.activity]] -= 1;
        return p;
      },
      () => ({ agonist: 0, antagonist: 0, upOrDown: 0 })
    );

    // charts
    const chartTrialByStatus = dc.rowChart('#dc-trial-by-status-chart');
    const chartTrialByPhase = dc.rowChart('#dc-trial-by-phase-chart');
    const chartTrialByDrug = dc.rowChart('#dc-trial-by-drug-chart');
    const chartDrugByActivity = dc.pieChart('#dc-drug-by-activity-chart');
    const chartDrugAndDiseaseByActivity = dc.heatMap(
      '#dc-drug-and-disease-by-activity-chart'
    );

    chartTrialByStatus
      .width(280)
      .height(280)
      .margins({ top: 20, left: 10, right: 10, bottom: 20 })
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value.trialCounts).length)
      .group(groupTrialByStatus)
      .dimension(dimStatus)
      .title(d => 'Status')
      .colors(['#7B1A6A'])
      .elasticX(true)
      .xAxis()
      .ticks(4);

    chartTrialByPhase
      .width(280)
      .height(280)
      .margins({ top: 20, left: 10, right: 10, bottom: 20 })
      .label(d => `Phase ${d.key}`)
      .valueAccessor(d => Object.keys(d.value.trialCounts).length)
      .group(groupTrialByPhase)
      .dimension(dimPhase)
      .title(d => 'Phase')
      .colors(['#7B1A6A'])
      .elasticX(true)
      .xAxis()
      .ticks(4);

    chartTrialByDrug
      .width(280)
      .height(580)
      .margins({ top: 20, left: 10, right: 10, bottom: 20 })
      .group(groupDrugBy)
      .dimension(dimDrug)
      .label(d => d.key)
      .valueAccessor(d => Object.keys(d.value.trialCounts).length)
      .title(d => 'Phase by Drug')
      .colors(['#7B1A6A'])
      .elasticX(true)
      .xAxis()
      .ticks(4);

    chartDrugByActivity
      .width(280)
      .height(280)
      .radius(120)
      .innerRadius(30)
      .dimension(dimActivity)
      .group(groupDrugByActivity)
      .valueAccessor(d => Object.keys(d.value).length)
      .colorAccessor(d => d.key)
      .colors(
        d3
          .scaleOrdinal()
          .domain(['agonist', 'antagonist', 'upOrDown'])
          .range(['#99f', '#f99', '#bbb'])
      );

    chartDrugAndDiseaseByActivity
      .width(600)
      .height(1200)
      .margins({ top: 20, left: 150, right: 10, bottom: 150 })
      .dimension(dimDrugAndDisease)
      .group(groupDrugAndDiseaseByActivity)
      .keyAccessor(function(d) {
        return d.key[0];
      })
      .valueAccessor(function(d) {
        return d.key[1];
      })
      .colorAccessor(function(d) {
        return d.value.agonist > 0
          ? 3
          : d.value.upOrDown > 0
          ? 2
          : d.value.antagonist > 0
          ? 1
          : 0;
      })
      .colors(
        d3
          .scaleOrdinal()
          .domain([0, 1, 2, 3])
          .range(['#f99', '#99f', '#bbb', '#eee'])
      )
      .renderTitle(true)
      .title('Activity by drug and disease')
      .legend(
        dc
          .legend()
          .x(10)
          .y(255)
          .gap(5)
          .horizontal(true)
      )
      .xBorderRadius(0)
      .yBorderRadius(0)
      .calculateColorDomain();

    dc.renderAll();

    // state for material table: initial
    this.setState({ filteredRows: ndx.allFiltered() });
    // state for material table: on chart filter
    const that = this;
    dc.chartRegistry.list().forEach(chart =>
      chart.on('filtered', () => {
        console.log('filtered');
        that.setState({ filteredRows: ndx.allFiltered() });
      })
    );

    // rotate labels
    chartDrugAndDiseaseByActivity
      .selectAll('g.cols.axis > text')
      .attr('transform', function(d) {
        var coord = this.getBBox();
        var x = coord.x + coord.width / 2,
          y = coord.y + coord.height / 2;
        return 'rotate(-45 ' + x + ' ' + y + ')';
      })
      .style('text-anchor', 'end');

    chartDrugAndDiseaseByActivity.selectAll('g.rows.axis > text').attr('dy', 0);
  };
}

export default withStyles(styles)(KnownDrugsDetail);
