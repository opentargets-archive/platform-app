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
    drugActivity: __type(name: "DrugActivity") {
      enumValues {
        name
        description
      }
    }
    drugType: __type(name: "DrugType") {
      enumValues {
        name
        description
      }
    }
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

            const ndx = crossfilter(data.targetDetailDrugs.rows);
            const dimTrialStatus = ndx.dimension(d =>
              d.status ? d.status : 'UNKNOWN'
            );
            const groupTrialStatus = dimTrialStatus.group();
            const dimDrugActivity = ndx.dimension(d => d.activity);
            const dimDrugType = ndx.dimension(d => d.drugType);
            const dimPhase = ndx.dimension(d => d.phase);
            const groupPhase = dimPhase.group();

            const dimDrug = ndx.dimension(d => d.drugName);
            {
              /* const groupDrugByType = dimDrug.group();
            groupDrugByType.reduce(
              (p, v) => if()
            ) */
            }

            const chartTrialStatus = dc.rowChart('#dc-trial-status-chart');
            const chartPhase = dc.rowChart('#dc-phase-chart');
            {
              /* const chartDrugByType = dc.rowChart('#dc-drug-by-type-chart'); */
            }
            {
              /* const chartDrugCrossPhase = dc.heatMap(
              '#dc-drug-cross-phase-chart'
            ); */
            }
            // const tableDrugs = dc.dataTable('#dc-drugs-table');

            chartTrialStatus
              .width(380)
              .height(380)
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
              .height(380)
              .margins({ top: 20, left: 10, right: 10, bottom: 20 })

              .group(groupPhase)
              .dimension(dimPhase)
              .title(d => 'Phase')
              .elasticX(true)
              .xAxis()
              .ticks(4);

            {
              /* chartDrugByType
              .width(380)
              .height(380)
              .margins({ top: 20, left: 10, right: 10, bottom: 20 })

              .group(groupDrugByType)
              .dimension(dimDrug)
              .title(d => 'Phase')
              .elasticX(true)
              .xAxis()
              .ticks(4); */
            }

            /* tableDrugs
              .dimension(dimRow)
              .group(groupAll)
              .size(10)
              .columns([
                'targetSymbol',
                'efoLabel',
                'drugName',
                'status',
                'phase',
                'activity',
                'drugType',
              ]); */

            dc.renderAll();

            return null;
          }}
        </Query>
        <div id="dc-trial-status-chart" className={classes.dc} />
        <div id="dc-phase-chart" className={classes.dc} />
        <div id="dc-drug-by-type-chart" className={classes.dc} />
        <div id="dc-drug-cross-phase-chart" className={classes.dc} />
        <div id="dc-drug-type-chart" className={classes.dc} />
        <div id="dc-drug-activity-chart" className={classes.dc} />
        <div id="dc-drugs-table" className={classes.dc} />
      </div>
    );
  }
}

export default withStyles(styles)(KnownDrugsDetail);
