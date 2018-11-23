import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import crossfilter from 'crossfilter2';
import dc from 'dc';
import _ from 'lodash';
import * as d3 from 'd3';

import { OtTable } from 'ot-ui';

import ScoreCell from '../components/ScoreCell';
import DCContainer from './DCContainer';

const styles = theme => ({
  dcChartContainer: {
    padding: '8px',
  },
  dataTypeFilterContainer: {
    width: '100%',
  },
});

const columns = dataTypes => [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => d.disease.name,
  },
  {
    id: 'score',
    label: 'Overall',
    renderCell: d => <ScoreCell score={d.score} />,
  },
  ...dataTypes.enumValues.map(dt => ({
    id: dt.name,
    label: dt.name,
    comparator: (a, b) => a.dataTypes[dt.name] - b.dataTypes[dt.name],
    renderCell: d => <ScoreCell score={d.dataTypes[dt.name]} />,
  })),
];

class TargetAssociationsDetail extends Component {
  state = {
    filteredRows: [],
  };
  componentDidMount() {
    this.renderDC();
  }
  render() {
    const { data, classes } = this.props;
    const { dataTypes } = data;

    return (
      <React.Fragment>
        <Typography variant="h2">
          NUMBER diseases associated with GENE SYMBOL
        </Typography>
        <Paper>
          {dataTypes.enumValues.map(dt => (
            <div className={classes.dataTypeFilterContainer}>
              <DCContainer
                id={`dc-disease-by-with-${dt.name.toLowerCase()}-chart`}
                title={dt.name.toLowerCase()}
              />
              <DCContainer
                id={`dc-${dt.name.toLowerCase()}-dist-chart`}
                title={dt.name.toLowerCase()}
              />
            </div>
          ))}
          {/* <DCContainer id="dc-disease-by-with-genetic-chart" title="GENETIC" />
          <DCContainer id="dc-disease-by-with-somatic-chart" title="SOMATIC" />
          <DCContainer id="dc-genetic-dist-chart" title="GENETIC DIST" /> */}
        </Paper>
        <OtTable
          loading={false}
          error={null}
          columns={columns(dataTypes)}
          data={this.state.filteredRows}
        />
      </React.Fragment>
    );
  }
  renderDC = () => {
    const { data } = this.props;
    const { dataTypes, targetAssociations } = data;
    const { associations } = targetAssociations;

    const associationsFlat = associations.map(d => ({
      ...d,
      dataTypes: dataTypes.enumValues.reduce((acc, k) => {
        acc[k.name] = d.dataTypes.find(t => t.dataType === k.name).score;
        return acc;
      }, {}),
    }));

    // connect
    const ndx = crossfilter(associationsFlat);

    // dimensions
    // const dimWithGenetic = ndx.dimension(d =>
    //   d.dataTypes.GENETIC > 0 ? 'Yes' : 'No'
    // );
    // const dimWithSomatic = ndx.dimension(d =>
    //   d.dataTypes.SOMATIC > 0 ? 'Yes' : 'No'
    // );
    // const dimDistGenetic = ndx.dimension(
    //   d => +Math.ceil(d.dataTypes.GENETIC * 100)
    // );
    const dimsWithDataType = dataTypes.enumValues.reduce((acc, dt) => {
      acc[dt.name] = ndx.dimension(d =>
        d.dataTypes[dt.name] > 0 ? 'Yes' : 'No'
      );
      return acc;
    }, {});
    const dimsDistDataType = dataTypes.enumValues.reduce((acc, dt) => {
      acc[dt.name] = ndx.dimension(d => +Math.ceil(d.dataTypes[dt.name] * 100));
      return acc;
    }, {});

    // groups
    // const groupDiseasesByWithGenetic = dimWithGenetic.group().reduceCount();
    // const groupDiseasesByWithSomatic = dimWithSomatic.group().reduceCount();
    // const groupDistGenetic = dimDistGenetic.group().reduceCount();
    // const wrappedGroupDistGenetic = {
    //   all: () => groupDistGenetic.all().filter(d => d.key > 0),
    // };
    // console.log(groupDistGenetic.all());
    // console.log(wrappedGroupDistGenetic.all());
    const groupsWithDataType = dataTypes.enumValues.reduce((acc, dt) => {
      acc[dt.name] = dimsWithDataType[dt.name].group().reduceCount();
      return acc;
    }, {});
    const groupsDistDataType = dataTypes.enumValues.reduce((acc, dt) => {
      acc[dt.name] = dimsDistDataType[dt.name].group().reduceCount();
      return acc;
    }, {});
    const wrappedGroupsDistDataType = dataTypes.enumValues.reduce((acc, dt) => {
      acc[dt.name] = {
        all: () => groupsDistDataType[dt.name].all().filter(d => d.key > 0),
      };
      return acc;
    }, {});

    // chart
    // dc.pieChart('#dc-disease-by-with-genetic-chart')
    //   .width(100)
    //   .height(100)
    //   .radius(50)
    //   .innerRadius(20)
    //   .dimension(dimWithGenetic)
    //   .group(groupDiseasesByWithGenetic);

    // dc.pieChart('#dc-disease-by-with-somatic-chart')
    //   .width(100)
    //   .height(100)
    //   .radius(50)
    //   .innerRadius(20)
    //   .dimension(dimWithSomatic)
    //   .group(groupDiseasesByWithSomatic);
    dataTypes.enumValues.forEach(dt => {
      dc.pieChart(`#dc-disease-by-with-${dt.name.toLowerCase()}-chart`)
        .width(100)
        .height(100)
        .radius(50)
        .innerRadius(20)
        .dimension(dimsWithDataType[dt.name])
        .group(groupsWithDataType[dt.name]);

      dc.barChart(`#dc-${dt.name.toLowerCase()}-dist-chart`)
        .width(400)
        .height(100)
        .margins({ top: 20, right: 10, bottom: 20, left: 40 })
        .elasticY(true)
        .gap(0.01)
        .x(d3.scaleLinear().domain([0, 100]))
        // .keyAccessor(d => d.key)
        // .valueAccessor(d => Math.log10(d.value)) // use log scale?
        // .x(d3.scaleBand())
        // .xUnits(dc.units.ordinal)
        // .round(dc.round.floor)
        // .alwaysUseRounding(true)
        .barPadding(0.01)
        .centerBar(true)
        // .outerPadding(0)
        .dimension(dimsDistDataType[dt.name])
        // .group(groupDistGenetic);
        .group(wrappedGroupsDistDataType[dt.name]);
    });

    // dc.barChart('#dc-genetic-dist-chart')
    //   .width(400)
    //   .height(100)
    //   .margins({ top: 20, right: 10, bottom: 20, left: 40 })
    //   // .elasticY(true)
    //   .gap(0.01)
    //   .x(d3.scaleLinear().domain([0, 100]))
    //   // .keyAccessor(d => d.key)
    //   // .valueAccessor(d => Math.log10(d.value)) // use log scale?
    //   // .x(d3.scaleBand())
    //   // .xUnits(dc.units.ordinal)
    //   // .round(dc.round.floor)
    //   // .alwaysUseRounding(true)
    //   .barPadding(0.01)
    //   .centerBar(true)
    //   // .outerPadding(0)
    //   .dimension(dimDistGenetic)
    //   // .group(groupDistGenetic);
    //   .group(wrappedGroupDistGenetic);

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

export default withStyles(styles)(TargetAssociationsDetail);
