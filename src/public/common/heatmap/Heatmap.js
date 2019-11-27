import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

// TODO: make color scale a prop (per column? eg. tractability is distinct)
const color = d3
  .scaleLinear()
  .domain([0, 1])
  .range(['#D4E6F4', '#3489CA'])
  .unknown('#FFF');

class Heatmap extends React.Component {
  componentDidMount() {
    this._render();
  }
  componentDidUpdate() {
    this._render();
  }
  render() {
    const { measureRef } = this.props;
    const { width, height } = this._dimensions();
    return (
      <div ref={measureRef}>
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
          <g className="heatmap-rows" />
          <g className="heatmap-column-labels" />
          <g className="heatmap-column-sliders" />
          <g className="heatmap-column-sorters" />
        </svg>
      </div>
    );
  }
  _dimensions() {
    const { contentRect, rowsPerPage, heightPerRow } = this.props;
    const { width } = contentRect.bounds;
    const margin = { left: 100, right: 20, top: 250, bottom: 20 };
    const heatmapHeight = rowsPerPage * heightPerRow;
    const height = heatmapHeight + margin.top + margin.bottom;
    return { width, height, margin, heatmapHeight };
  }
  _render() {
    const {
      columnGroups,
      rowLabelWidth,
      columnGroupSeparatorWidth,
      heightPerRow,
    } = this.props;
    const { width, margin } = this._dimensions();
    const heatmapWidth = width - rowLabelWidth - margin.left - margin.right;
    const heatmapCellCount = columnGroups.reduce(
      (acc, d) => acc + d.columns.length,
      0
    );
    const heatmapCellHeight = heightPerRow;
    const heatmapCellWidth =
      (heatmapWidth - (columnGroups.length - 1) * columnGroupSeparatorWidth) /
      heatmapCellCount;

    this._renderRows({ heatmapCellWidth, heatmapCellHeight });
  }
  _renderRows({ heatmapCellWidth, heatmapCellHeight }) {
    const { rows } = this.props;
    const g = d3.select('.heatmap-rows');

    const t = d3.transition().duration(2000);

    // join
    const row = g.selectAll('g').data(rows, d => d.id);

    // exit
    row
      .exit()
      .transition(t)
      .attr('opacity', 0)
      .remove();

    // enter
    const rowEnter = row
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${i * heatmapCellHeight})`)
      .attr('opacity', 0);

    // enter transition
    rowEnter.transition(t).attr('opacity', 1);

    // update transition
    row
      .transition(t)
      .attr('transform', (d, i) => `translate(0,${i * heatmapCellHeight})`);

    // merge (new and updated)
    const rowMerge = rowEnter.merge(row);

    // ------------- per row -------------

    this._renderRowLabels({
      rowEnter,
      rowMerge,
      heatmapCellHeight,
    });
    this._renderRowHeatmapCells({
      rowEnter,
      rowMerge,
      heatmapCellWidth,
      heatmapCellHeight,
    });
    // renderGeneLabels(rowEnter, rowMerge);
    // renderCells(rowEnter, rowMerge, row, g);
  }
  _renderRowLabels({ rowEnter, rowMerge, heatmapCellHeight }) {
    const { rowLabelAccessor } = this.props;

    rowEnter
      .append('text')
      .attr('x', -5)
      .attr('y', heatmapCellHeight / 2)
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '10px')
      .attr('font-family', 'sans-serif');

    rowMerge.select('text').text(rowLabelAccessor);
  }
  _renderRowHeatmapCells({
    rowEnter,
    rowMerge,
    heatmapCellWidth,
    heatmapCellHeight,
  }) {
    // ------------- overall -------------
    rowEnter
      .append('rect')
      .classed('overall', true)
      .attr('stroke', '#DDD')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', heatmapCellWidth)
      .attr('height', heatmapCellHeight);

    rowMerge.select('rect.overall').attr('fill', d => color(d.score));

    // ------------- per datasource -------------
    const gDatasources = rowMerge
      .append('g')
      .classed('datasources', true)
      .attr('transform', `translate(${2 * heatmapCellWidth},0)`);

    const datasourceCell = gDatasources
      .selectAll('rect')
      .data(d => d.scorePerDS);

    const datasourceCellEnter = datasourceCell
      .enter()
      .append('rect')
      .attr('stroke', '#DDD')
      .attr('x', (d, i) => i * heatmapCellWidth)
      .attr('y', 0)
      .attr('width', heatmapCellWidth)
      .attr('height', heatmapCellHeight);

    datasourceCellEnter.merge(datasourceCell).attr('fill', d => color(d.score));
  }
}
Heatmap.defaultProps = {
  rowsPerPage: 20,
  heightPerRow: 50,
  rowLabelWidth: 200,
  columnGroupSeparatorWidth: 20,
};

export default withContentRect('bounds')(Heatmap);
