// import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import withStyles from '@material-ui/core/styles/withStyles';
// import crossfilter from 'crossfilter2';
// import dc from 'dc';
// import * as d3 from 'd3';

// import { OtTable } from 'ot-ui';

// import ScoreCell from '../components/ScoreCell';
// import DCContainer from './DCContainer';

// const styles = theme => ({
//   dcChartContainer: {
//     padding: '8px',
//   },
//   dataTypeFilterContainer: {
//     width: '100%',
//     clear: 'both',
//     '& svg g g.axis.x .tick': {
//       display: 'none',
//     },
//     '& svg g g.axis.y .tick': {
//       display: 'none',
//     },
//     '& svg g g.axis .path': {
//       stroke: '#EEE',
//     },
//   },
// });

// const columns = dataTypes => [
//   {
//     id: 'disease.id',
//     label: 'Disease',
//     renderCell: d => d.disease.name,
//   },
//   {
//     id: 'score',
//     label: 'Overall',
//     renderCell: d => <ScoreCell score={d.score} />,
//   },
//   ...dataTypes.enumValues.map(dt => ({
//     id: dt.name,
//     label: dt.name,
//     comparator: (a, b) => a.dataTypes[dt.name] - b.dataTypes[dt.name],
//     renderCell: d => <ScoreCell score={d.dataTypes[dt.name]} />,
//   })),
// ];

// class TargetAssociationsDetail extends Component {
//   state = {
//     filteredRows: [],
//   };
//   componentDidMount() {
//     this.renderDC();
//   }
//   render() {
//     const { data, classes } = this.props;
//     const { dataTypes } = data;

//     return (
//       <React.Fragment>
//         <Typography variant="h2">
//           {data.targetAssociations.associations.length} diseases associated with
//           GENE SYMBOL
//         </Typography>
//         <Grid container spacing={16}>
//           <Grid item container direction="column" xs={3}>
//             <Paper>
//               <div>
//                 <h3>Data Type</h3>
//                 {dataTypes.enumValues.map(dt => (
//                   <div
//                     className={classes.dataTypeFilterContainer}
//                     key={dt.name}
//                   >
//                     <div>
//                       <span>{dt.name}</span>
//                     </div>
//                     <DCContainer
//                       id={`dc-disease-by-with-${dt.name.toLowerCase()}-chart`}
//                       title={null}
//                     />
//                     <DCContainer
//                       id={`dc-${dt.name.toLowerCase()}-dist-chart`}
//                       title={null}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <h3>Therapeutic Area</h3>
//                 <DCContainer
//                   id={`dc-disease-by-therapeutic-area-chart`}
//                   title={null}
//                 />
//               </div>
//             </Paper>
//           </Grid>
//           <Grid item xs={9}>
//             <OtTable
//               loading={false}
//               error={null}
//               pageSize={20}
//               columns={columns(dataTypes)}
//               data={this.state.filteredRows}
//             />
//           </Grid>
//         </Grid>
//       </React.Fragment>
//     );
//   }
//   renderDC = () => {
//     const { data } = this.props;
//     const { dataTypes, targetAssociations } = data;
//     const { associations } = targetAssociations;

//     // const therapeuticAreas = associations.reduce((acc, d) => {
//     //   if (d.therapeuticAreas) {
//     //     d.therapeuticAreas.forEach(ta => {
//     //       acc[ta.id] = ta.name;
//     //     });
//     //   }
//     //   return acc;
//     // }, {});

//     const associationsFlat = associations.map(d => ({
//       ...d,
//       dataTypes: dataTypes.enumValues.reduce((acc, k) => {
//         acc[k.name] = d.dataTypes.find(t => t.dataType === k.name).score;
//         return acc;
//       }, {}),
//       therapeuticAreas: d.therapeuticAreas
//         ? d.therapeuticAreas.map(ta => ta.name)
//         : [],
//     }));

//     // connect
//     const ndx = crossfilter(associationsFlat);

//     // dimensions
//     const dimsWithDataType = dataTypes.enumValues.reduce((acc, dt) => {
//       acc[dt.name] = ndx.dimension(d =>
//         d.dataTypes[dt.name] > 0 ? 'Yes' : 'No'
//       );
//       return acc;
//     }, {});
//     const dimsDistDataType = dataTypes.enumValues.reduce((acc, dt) => {
//       acc[dt.name] = ndx.dimension(d => +Math.ceil(d.dataTypes[dt.name] * 20));
//       return acc;
//     }, {});
//     const dimTherapeuticArea = ndx.dimension(d => d.therapeuticAreas, true);

//     // groups
//     const groupsWithDataType = dataTypes.enumValues.reduce((acc, dt) => {
//       acc[dt.name] = dimsWithDataType[dt.name].group().reduceCount();
//       return acc;
//     }, {});
//     const groupsDistDataType = dataTypes.enumValues.reduce((acc, dt) => {
//       acc[dt.name] = dimsDistDataType[dt.name].group().reduceCount();
//       return acc;
//     }, {});
//     const wrappedGroupsDistDataType = dataTypes.enumValues.reduce((acc, dt) => {
//       acc[dt.name] = {
//         all: () => groupsDistDataType[dt.name].all().filter(d => d.key > 0),
//       };
//       return acc;
//     }, {});
//     const groupTherapeuticArea = dimTherapeuticArea.group().reduceCount();

//     // chart
//     dataTypes.enumValues.forEach(dt => {
//       dc.pieChart(`#dc-disease-by-with-${dt.name.toLowerCase()}-chart`)
//         .width(40)
//         .height(40)
//         .radius(18)
//         .innerRadius(8)
//         .renderLabel(false)
//         .colorAccessor(d => d.key)
//         .colors(
//           d3
//             .scaleOrdinal()
//             .domain(['Yes', 'No'])
//             .range(['#015299', '#EEE'])
//         )
//         .dimension(dimsWithDataType[dt.name])
//         .group(groupsWithDataType[dt.name]);

//       dc.barChart(`#dc-${dt.name.toLowerCase()}-dist-chart`)
//         .width(200)
//         .height(40)
//         .margins({ top: 1, right: 1, bottom: 1, left: 1 })
//         .elasticY(true)
//         .gap(1)
//         .x(d3.scaleLinear().domain([0, 20]))
//         // .valueAccessor(d => Math.log10(d.value)) // use log scale?
//         .barPadding(0.01)
//         // .centerBar(true)
//         .dimension(dimsDistDataType[dt.name])
//         .group(wrappedGroupsDistDataType[dt.name]);
//     });
//     dc.rowChart('#dc-disease-by-therapeutic-area-chart')
//       .width(240)
//       .height(480)
//       .margins({ top: 1, left: 5, right: 5, bottom: 20 })
//       .group(groupTherapeuticArea)
//       .dimension(dimTherapeuticArea)
//       .colors(['#015299'])
//       .elasticX(true)
//       .xAxis()
//       .ticks(4);

//     dc.renderAll();

//     // state for material table: initial
//     this.setState({ filteredRows: ndx.allFiltered() });
//     // state for material table: on chart filter
//     const that = this;
//     dc.chartRegistry.list().forEach(chart =>
//       chart.on('filtered', () => {
//         that.setState({ filteredRows: ndx.allFiltered() });
//       })
//     );
//   };
// }

// export default withStyles(styles)(TargetAssociationsDetail);
