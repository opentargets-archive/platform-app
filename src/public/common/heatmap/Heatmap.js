import React from 'react';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

// TODO: make color scale a prop (per column? eg. tractability is distinct)
const color = d3
  .scaleLinear()
  .domain([0, 1])
  .range(['#D4E6F4', '#3489CA'])
  .unknown('#FFF');

const cellMargin = 1;

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
      rows,
      columnGroups,
      labelAccessor,
      rowLabelWidth,
      columnGroupSeparatorWidth,
      heightPerRow,
    } = this.props;
    const { width, margin } = this._dimensions();

    if (!width) {
      // initial render should be skipped (no width value)
      return;
    }

    const heatmapWidth = width - rowLabelWidth - margin.left - margin.right;
    const heatmapCellCount = columnGroups.reduce(
      (acc, d) => acc + d.columns.length,
      0
    );
    const heatmapCellHeight = heightPerRow;
    const heatmapCellWidth =
      (heatmapWidth - (columnGroups.length - 1) * columnGroupSeparatorWidth) /
      heatmapCellCount;

    const columnGroupsWithPosition = columnGroups.reduce((acc, cg, i) => {
      const xStart =
        i === 0 ? rowLabelWidth : acc[i - 1].xEnd + columnGroupSeparatorWidth;
      const xEnd = xStart + cg.columns.length * heatmapCellWidth;
      acc.push({
        ...cg,
        xStart,
        xEnd,
      });
      return acc;
    }, []);

    const columnsWithPosition = columnGroupsWithPosition.reduce((acc, cg) => {
      cg.columns.forEach((col, i) => {
        const xStart = cg.xStart + i * heatmapCellWidth;
        const xEnd = xStart + heatmapCellWidth;
        acc.push({
          ...col,
          xStart,
          xEnd,
        });
      });
      return acc;
    }, []);
    // const rowsWithPosition = rows

    this._renderColumnLabels({ columnsWithPosition, margin });
    this._renderRows({
      rows,
      margin,
      rowLabelWidth,
      heatmapCellWidth,
      heatmapCellHeight,
      labelAccessor,
      columnsWithPosition,
      columnGroupSeparatorWidth,
    });
  }
  _renderColumnLabels({ columnsWithPosition, margin }) {
    const g = d3
      .select('.heatmap-column-labels')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const columnLabel = g.selectAll('text').data(columnsWithPosition);

    columnLabel.join(
      enter =>
        enter
          .append('text')
          .attr('text-anchor', 'start')
          .attr('alignment-baseline', 'middle')
          .attr('font-size', '10px')
          .attr('font-family', 'sans-serif')
          .attr(
            'transform',
            d => `rotate(-90) translate(20,${(d.xStart + d.xEnd) / 2})`
          )
          .text(d => d.label),
      update =>
        update
          .attr(
            'transform',
            d => `rotate(-90) translate(20,${(d.xStart + d.xEnd) / 2})`
          )
          .text(d => d.label),
      exit => exit.remove()
    );

    const columnSortIcons = g
      .selectAll('path')
      .data(columnsWithPosition.filter(c => c.isSortable));

    columnSortIcons.join(
      enter =>
        enter
          .append('path')
          .attr(
            'transform',
            d =>
              `translate(${(d.xStart + d.xEnd) / 2},-10)${
                d.isSortActive && d.sortDirection === 'asc'
                  ? 'rotate(180) '
                  : ''
              }`
          )
          .attr('stroke', d => (d.isSortActive ? 'black' : '#bbb'))
          .attr('fill', 'none')
          .attr('stroke-width', 2)
          .attr('cursor', 'pointer')
          .attr('d', 'M0,-5 L0,5 M-6,-1 L0,5 L6,-1')
          .on('click', d => d.onSort()),
      update =>
        update
          .attr(
            'transform',
            d =>
              `translate(${(d.xStart + d.xEnd) / 2},-10)${
                d.isSortActive && d.sortDirection === 'asc'
                  ? 'rotate(180) '
                  : ''
              }`
          )
          .attr('stroke', d => (d.isSortActive ? 'black' : '#bbb'))
          .attr('d', 'M0,-5 L0,5 M-6,-1 L0,5 L6,-1')
          .on('click', d => d.onSort()),
      exit => exit.remove()
    );
  }
  _renderRows({
    rows,
    margin,
    rowLabelWidth,
    heatmapCellWidth,
    heatmapCellHeight,
    labelAccessor,
    columnsWithPosition,
    columnGroupSeparatorWidth,
  }) {
    const g = d3
      .select('.heatmap-rows')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const row = g.selectAll('g.heatmap-row').data(rows, d => d.target.id);

    const rowMerged = row.join(
      enter => {
        enter = enter
          .append('g')
          .classed('heatmap-row', true)
          .attr('transform', (d, i) => `translate(0,${i * heatmapCellHeight})`);

        // row label
        enter
          .append('text')
          .attr('x', rowLabelWidth - columnGroupSeparatorWidth)
          .attr('y', heatmapCellHeight / 2)
          .attr('text-anchor', 'end')
          .attr('alignment-baseline', 'middle')
          .attr('font-size', '10px')
          .attr('font-family', 'sans-serif');

        // container for heatmap cells
        enter.append('g').classed('heatmap-cells', true);

        return enter;
      },
      update =>
        update.attr(
          'transform',
          (d, i) => `translate(0,${i * heatmapCellHeight})`
        ),
      exit => exit.remove()
    );

    // row label
    rowMerged.select('text').text(labelAccessor);

    // row cells
    const cell = rowMerged
      .select('g.heatmap-cells')
      .selectAll('rect')
      .data(
        d => {
          const cellDataForRow = columnsWithPosition.map(c => ({
            id: c.label,
            xStart: c.xStart,
            xEnd: c.xEnd,
            value: c.valueAccessor(d),
          }));
          return cellDataForRow;
        },
        d => d.id
      );
    cell.join(
      enter =>
        enter
          .append('rect')
          .attr('stroke', '#eee')
          .attr('x', d => d.xStart - cellMargin)
          .attr('y', cellMargin)
          .attr('width', heatmapCellWidth - 2 * cellMargin)
          .attr('height', heatmapCellHeight - 2 * cellMargin)
          .attr('fill', d => color(d.value)),
      update =>
        update
          .attr('x', d => d.xStart - cellMargin)
          .attr('width', heatmapCellWidth - 2 * cellMargin)
          .attr('height', heatmapCellHeight - 2 * cellMargin)
          .attr('fill', d => color(d.value)),
      exit => exit.remove()
    );
  }
}
Heatmap.defaultProps = {
  rowsPerPage: 20,
  heightPerRow: 12,
  rowLabelWidth: 200,
  columnGroupSeparatorWidth: 10,
};

export default withContentRect('bounds')(Heatmap);
