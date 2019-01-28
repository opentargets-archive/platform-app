import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import * as d3 from 'd3';

import DCContainer from '../DCContainer';
import { OtTable } from 'ot-ui';
// import TrialsHistogram from './TrialsHistogram';
import classNames from 'classnames';

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
  },

  countLabelSection: {
    width: '220px',
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
          <div className={classes.countLabelSection}>
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

          <DCContainer id="dc-trial-by-status-chart" title="Trials by Status" />
          <DCContainer id="dc-trial-by-phase-chart" title="Trials by Phase" />
          <DCContainer id="dc-trial-by-drug-chart" title="Trials by Drug" />
          <DCContainer
            id="dc-drug-by-activity-chart"
            title="Drug by Activity"
          />
          {/* <DCContainer
            id="dc-drug-and-disease-by-activity-chart"
            title="Activity by (Disease, Drug)"
          /> */}
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
    console.log(rows[0]);
    // connect
    const ndx = crossfilter(rows);

    // dimensions
    const dimStatus = ndx.dimension(d => d.clinicalTrial.status || 'UNKNOWN');
    const dimPhase = ndx.dimension(d => d.clinicalTrial.phase);
    const dimActivity = ndx.dimension(d => d.drug.activity);
    const dimDrugAndDisease = ndx.dimension(d => [d.drug.name, d.disease.name]);
    const dimDrug = ndx.dimension(d => d.drug.name);

    // groups
    const drugCount = ndx.groupAll().reduce(
      (p, d) => {
        p[d.drug.id] = 1;
        return p;
      },
      (p, d) => {
        delete p[d.drug.id];
        return p;
      },
      () => ({})
    );

    const targetCount = ndx.groupAll().reduce(
      (p, d) => {
        p[d.target.id] = 1;
        return p;
      },
      (p, d) => {
        delete p[d.target.id];
        return p;
      },
      () => ({})
    );

    const diseaseCount = ndx.groupAll().reduce(
      (p, d) => {
        p[d.disease.id] = 1;
        return p;
      },
      (p, d) => {
        delete p[d.disease.id];
        return p;
      },
      () => ({})
    );

    const groupTrialByStatus = dimStatus.group().reduce(
      (p, d) => {
        if (d.clinicalTrial.sourceUrl in p.trialCounts) {
          p.trialCounts[d.clinicalTrial.sourceUrl] += 1;
        } else {
          p.trialCounts[d.clinicalTrial.sourceUrl] = 1;
        }
        return p;
      },
      (p, d) => {
        p.trialCounts[d.clinicalTrial.sourceUrl] -= 1;
        if (p.trialCounts[d.clinicalTrial.sourceUrl] === 0) {
          delete p.trialCounts[d.clinicalTrial.sourceUrl];
        }
        return p;
      },
      () => ({ trialCounts: {} })
    );

    const groupTrialByPhase = dimPhase.group().reduce(
      (p, d) => {
        if (d.clinicalTrial.sourceUrl in p.trialCounts) {
          p.trialCounts[d.clinicalTrial.sourceUrl] += 1;
        } else {
          p.trialCounts[d.clinicalTrial.sourceUrl] = 1;
        }
        return p;
      },
      (p, d) => {
        p.trialCounts[d.clinicalTrial.sourceUrl] -= 1;
        if (p.trialCounts[d.clinicalTrial.sourceUrl] === 0) {
          delete p.trialCounts[d.clinicalTrial.sourceUrl];
        }
        return p;
      },
      () => ({ trialCounts: {} })
    );

    const groupDrugBy = dimDrug.group().reduce(
      (p, d) => {
        if (d.clinicalTrial.phase in p.phaseCounts) {
          p.phaseCounts[d.clinicalTrial.phase] += 1;
        } else {
          p.phaseCounts[d.clinicalTrial.phase] = 1;
        }

        if (d.clinicalTrial.sourceUrl in p.trialCounts) {
          p.trialCounts[d.clinicalTrial.sourceUrl] += 1;
        } else {
          p.trialCounts[d.clinicalTrial.sourceUrl] = 1;
        }

        return p;
      },
      (p, d) => {
        p.phaseCounts[d.clinicalTrial.phase] -= 1;
        if (p.phaseCounts[d.clinicalTrial.phase] === 0) {
          delete p.phaseCounts[d.clinicalTrial.phase];
        }

        p.trialCounts[d.clinicalTrial.sourceUrl] -= 1;
        if (p.trialCounts[d.clinicalTrial.sourceUrl] === 0) {
          delete p.trialCounts[d.clinicalTrial.sourceUrl];
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
        if (d.drug.name in p) {
          p[d.drug.name] += 1;
        } else {
          p[d.drug.name] = 1;
        }
        return p;
      },
      (p, d) => {
        p[d.drug.name] -= 1;
        if (p[d.drug.name] === 0) {
          delete p[d.drug.name];
        }
        return p;
      },
      () => ({})
    );

    const groupDrugAndDiseaseByActivity = dimDrugAndDisease.group().reduce(
      (p, d) => {
        p[activityMap[d.drug.activity]] += 1;
        return p;
      },
      (p, d) => {
        p[activityMap[d.drug.activity]] -= 1;
        return p;
      },
      () => ({ agonist: 0, antagonist: 0, upOrDown: 0 })
    );

    // charts
    const drugCountLabel = dc.numberDisplay('#unique-drugs-count');
    const targetsCountLabel = dc.numberDisplay('#associated-targets-count');
    const diseasesCountLabel = dc.numberDisplay('#associated-diseases-count');

    const chartTrialByStatus = dc.rowChart('#dc-trial-by-status-chart');
    const chartTrialByPhase = dc.rowChart('#dc-trial-by-phase-chart');
    const chartTrialByDrug = dc.rowChart('#dc-trial-by-drug-chart');
    const chartDrugByActivity = dc.pieChart('#dc-drug-by-activity-chart');
    const chartDrugAndDiseaseByActivity = dc.heatMap(
      '#dc-drug-and-disease-by-activity-chart'
    );

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
