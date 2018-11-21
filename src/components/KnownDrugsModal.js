import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import _ from 'lodash';
import * as d3 from 'd3';

import { OtTable } from 'ot-ui';

const knownDrugsQuery = gql`
  query KnownDrugsQuery($ensgId: String!) {
    trialStatus: __type(name: "TrialStatus") {
      enumValues {
        name
        description
      }
    }
    targetDetailDrugs(ensgId: $ensgId) {
      rows {
        targetId
        targetSymbol
        targetClass
        efoId
        efoLabel
        drugId
        drugName
        drugType
        phase
        status
        activity
        evidenceUrl
        evidenceSource
        mechanismOfAction
        mechanismOfActionUrl
        mechanismOfActionSource
      }
    }
  }
`;

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
});

const KnownDrugsModal = ({ classes, open, onClose, ensgId, symbol }) => {
  return (
    <Modal className={classes.modalContainer} open={open} onClose={onClose}>
      <Paper className={classes.modalContents}>
        <Typography>
          Drugs in clinical trials or approved for {symbol}
        </Typography>
        <div id="dc-trial-by-status-chart" className={classes.dc}>
          <strong>Trials by Status</strong>
          <div className="clearfix" />
        </div>
        <div id="dc-trial-by-phase-chart" className={classes.dc}>
          <strong>Trials by Phase</strong>
          <div className="clearfix" />
        </div>
        <div id="dc-trial-by-drug-chart" className={classes.dc}>
          <strong>Trials by Drug</strong>
          <div className="clearfix" />
        </div>
        <div id="dc-drug-by-activity-chart" className={classes.dc}>
          <strong>Drug by Activity</strong>
          <div className="clearfix" />
        </div>
        <div id="dc-drug-and-disease-by-activity-chart" className={classes.dc}>
          <strong>Activity by (Disease, Drug)</strong>
          <div className="clearfix" />
        </div>
        <div id="dc-drugs-table" className={classes.dc} />
        <Query query={knownDrugsQuery} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            const { rows } = data.targetDetailDrugs;

            // connect
            const ndx = crossfilter(rows);

            // dimensions
            const dimStatus = ndx.dimension(d => d.status || 'UNKNOWN');
            const dimPhase = ndx.dimension(d => d.phase);
            const dimActivity = ndx.dimension(d => d.activity);
            const dimDrugAndDisease = ndx.dimension(d => [
              d.drugName,
              d.efoLabel,
            ]);
            const dimTrial = ndx.dimension(d => d.evidenceUrl);
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
            const groupDrugAndDiseaseByActivity = dimDrugAndDisease
              .group()
              .reduce(
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
            const chartDrugByActivity = dc.pieChart(
              '#dc-drug-by-activity-chart'
            );
            const chartDrugAndDiseaseByActivity = dc.heatMap(
              '#dc-drug-and-disease-by-activity-chart'
            );

            // tables
            const tableDrugs = dc.dataTable('#dc-drugs-table');

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
              .width(1200)
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

            tableDrugs
              .dimension(dimDrug)
              .group(d => d.efoLabel)
              .size(10)
              .columns([
                'targetSymbol',
                'efoLabel',
                'drugName',
                'status',
                'phase',
                'activity',
                'drugType',
              ]);

            dc.renderAll();

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
            return (
              <OtTable
                loading={loading}
                error={error}
                columns={columns}
                data={rows}
              />
            );
          }}
        </Query>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(KnownDrugsModal);
