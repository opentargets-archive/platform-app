import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';

const styles = theme => ({
  dc: {
    backgroundColor: 'white',
  },
});

const query = gql`
  query KnownDrugsDetailQuery($ensgId: String!) {
    # drugActivity: __type(name: "DrugActivity") {
    #   enumValues {
    #     name
    #     description
    #   }
    # }
    # drugType: __type(name: "DrugType") {
    #   enumValues {
    #     name
    #     description
    #   }
    # }
    # trialStatus: __type(name: "TrialStatus") {
    #   enumValues {
    #     name
    #     description
    #   }
    # }
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

class KnownDrugsDetail extends Component {
  render() {
    const { ensgId, classes } = this.props;

    return (
      <div>
        <Query query={query} variables={{ ensgId }}>
          {({ loading, error, data }) => {
            if (loading || error) {
              return null;
            }

            // connect
            const ndx = crossfilter(data.targetDetailDrugs.rows);

            // dimensions and groups
            const dimTrialStatus = ndx.dimension(d =>
              d.status ? d.status : 'UNKNOWN'
            );

            const groupTrialStatus = dimTrialStatus.group();
            const dimDrugActivity = ndx.dimension(d => d.activity);
            const dimDrugType = ndx.dimension(d => d.drugType);
            const dimPhase = ndx.dimension(d => d.phase);
            const dimDrugAndDisease = ndx.dimension(d => [
              d.drugName,
              d.efoLabel,
            ]);
            const groupPhase = dimPhase.group();
            const dimDrug = ndx.dimension(d => d.drugName);
            const groupPhaseByDrug = dimDrug.group().reduce(
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
            console.log(groupDrugAndDiseaseByActivity.all());

            // charts
            const chartTrialStatus = dc.rowChart('#dc-trial-status-chart');
            const chartPhase = dc.rowChart('#dc-phase-chart');
            const chartPhaseByDrug = dc.rowChart('#dc-phase-by-drug-chart');
            const chartDrugAndDiseaseByActivity = dc.heatMap(
              '#dc-drug-and-disease-by-activity-chart'
            );

            const tableDrugs = dc.dataTable('#dc-drugs-table');

            chartTrialStatus
              .width(380)
              .height(580)
              .margins({ top: 20, left: 10, right: 10, bottom: 20 })
              .label(d => d.key)
              .group(groupTrialStatus)
              .dimension(dimTrialStatus)
              .title(d => 'Status')
              .elasticX(true)
              .xAxis()
              .ticks(4);

            chartPhase
              .width(380)
              .height(580)
              .margins({ top: 20, left: 10, right: 10, bottom: 20 })
              .group(groupPhase)
              .dimension(dimPhase)
              .title(d => 'Phase')
              .elasticX(true)
              .xAxis()
              .ticks(4);

            chartPhaseByDrug
              .width(380)
              .height(580)
              .margins({ top: 20, left: 10, right: 10, bottom: 20 })
              .group(groupPhaseByDrug)
              .dimension(dimDrug)
              .label(d => d.key)
              .valueAccessor(d => Object.keys(d.value.trialCounts).length)
              .title(d => 'Phase by Drug')
              .elasticX(true)
              .xAxis()
              .ticks(4);

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
                return d.value.agonist > 0 ? 1 : d.value.upOrDown > 0 ? 0 : -1;
              })
              .colors(['#f99', '#999', '#99f'])
              .legend(
                dc
                  .legend()
                  .x(10)
                  .y(255)
                  .gap(5)
                  .horizontal(true)
              )
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

            return null;
          }}
        </Query>
        <div id="dc-trial-status-chart" className={classes.dc}>
          <strong>Days by Gain/Loss</strong>
          <div className="clearfix" />
        </div>
        <div id="dc-phase-chart" className={classes.dc} />
        <div id="dc-drug-by-type-chart" className={classes.dc} />
        <div id="dc-phase-by-drug-chart" className={classes.dc} />
        <div id="dc-drug-type-chart" className={classes.dc} />
        <div id="dc-drug-activity-chart" className={classes.dc} />
        <div
          id="dc-drug-and-disease-by-activity-chart"
          className={classes.dc}
        />
        <div id="dc-drugs-table" className={classes.dc} />
      </div>
    );
  }
}

export default withStyles(styles)(KnownDrugsDetail);
