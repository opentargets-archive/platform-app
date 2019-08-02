import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';

import { Link, significantFigures } from 'ot-ui';

import {
  dataTypes,
  dataSourcesOrder,
  dataTypesColorScale,
} from '../common/dynamicAssociations/configuration';
import BaseAssociationsTable from '../common/AssociationsTable';
import VerticalSlider from '../common/VerticalSlider';
import HeatmapCell from '../common/HeatmapCell';
import DataTypesLegend from '../common/dynamicAssociations/DataTypesLegend';
import TopLevelControls from '../common/dynamicAssociations/TopLevelControls';
// import Histogram from '../common/Histogram';

const hideEmptyColumns = true;

const columns = (
  dataSources,
  colorScale,
  handleWeightChange,
  handleCellClick,
  aggregates,
  evidence
) => [
  {
    id: 'disease',
    label: 'Disease',
    ellipsisWidth: '100px',
    renderCell: d => d.obj.name,
    // renderCell: d => (
    //   <Link to={`/disease/${d.obj.id}`}>
    //     <span style={{ textOverflow: 'ellipsis' }}>{d.obj.name}</span>
    //   </Link>
    // ),
    comparator: (a, b) => d3.ascending(a.obj.name, b.obj.name),
  },
  {
    id: 'score',
    label: 'Score',
    verticalHeader: true,
    align: 'center',
    firstInHeaderGroup: true,
    lastInHeaderGroup: true,
    renderCell: d => <HeatmapCell value={d.score} colorScale={colorScale} />,
  },
  ...dataSources
    .filter(c => (hideEmptyColumns ? aggregates[c.id].coverage > 0 : true))
    .map(c => ({
      id: c.id,
      label: `${c.name} (${significantFigures(
        aggregates[c.id].coverage * 100
      )}%)`,
      verticalHeader: true,
      align: 'center',
      firstInHeaderGroup: dataTypes.some(dt => dt.dataSources[0] === c.id),
      lastInHeaderGroup: dataTypes.some(
        dt => dt.dataSources[dt.dataSources.length - 1] === c.id
      ),
      renderCell: d => (
        <HeatmapCell
          value={d.dsScores[c.position]}
          colorScale={colorScale}
          selected={
            evidence &&
            c.id === evidence.dataSourceId &&
            d.obj.id === evidence.efoId
          }
          onClick={() =>
            handleCellClick({
              efoId: d.obj.id,
              name: d.obj.name,
              dataSourceId: c.id,
            })
          }
        />
      ),
      renderFilter: () => (
        <VerticalSlider
          orientation="vertical"
          getAriaValueText={value => `Weight: ${significantFigures(value)}`}
          valueLabelDisplay="auto"
          defaultValue={c.weight}
          step={0.01}
          min={0}
          max={1}
          aria-labelledby="vertical-slider"
          onChangeCommitted={(event, value) => handleWeightChange(c, value)}
        />
      ),
      // renderLabelBackground: () => (
      //   <Histogram
      //     id={c.id}
      //     data={aggregates[c.id].histogram}
      //     color={colorScale(0.5)}
      //   />
      // ),
      comparator: (a, b) =>
        d3.ascending(a.dsScores[c.position], b.dsScores[c.position]),
    })),
];

const headerGroups = aggregates => [
  { renderCell: () => null, colspan: 2 },
  ...dataTypes.map(d => ({
    renderCell: () => (
      <div
        style={{
          width: '100%',
          height: '8px',
          background: dataTypesColorScale(d.name),
        }}
      />
    ),
    colspan: d.dataSources.filter(ds =>
      hideEmptyColumns ? aggregates[ds] && aggregates[ds].coverage > 0 : true
    ).length,
  })),
];

class AssociationsTable extends React.Component {
  handleWeightChange = (d, value) => {
    const { metadata, onDataSourcesChange } = this.props;

    const newDataSourcesUnordered = metadata.dsOptions.map((ds, i) => {
      const name = _.startCase(ds.id.split('__')[1]);
      const position = i;
      if (ds.id === d.id) {
        return {
          ...ds,
          name,
          position,
          weight: value,
        };
      } else {
        return {
          ...ds,
          name,
          position,
        };
      }
    });
    const newDataSources = dataSourcesOrder.map(ds =>
      newDataSourcesUnordered.find(d => d.id === ds)
    );
    const newOptions = metadata.options;

    onDataSourcesChange({ dataSources: newDataSources, options: newOptions });
  };
  componentDidUpdate(prevProps) {
    const { metadata, onDataSourcesChange } = this.props;

    // only triggered on initial load
    if (
      // dataSources !== prevProps.dataSources &&
      prevProps.dataSources.length === 0
    ) {
      const newDataSourcesUnordered = metadata.dsOptions.map((ds, i) => ({
        ...ds,
        name: _.startCase(ds.id.split('__')[1]),
        position: i,
      }));
      const newDataSources = dataSourcesOrder.map(ds =>
        newDataSourcesUnordered.find(d => d.id === ds)
      );
      const newOptions = metadata.options;

      onDataSourcesChange({ dataSources: newDataSources, options: newOptions });
    }
  }
  render() {
    const {
      theme,
      rows,
      indirects,
      dataSources,
      evidence,
      onIndirectsChange,
      onCellClick,
    } = this.props;

    const colorScale = d3
      .scaleLinear()
      .domain([0, Math.PI ** 2 / 6])
      .range(['#fff', theme.palette.primary.main]);

    const maxPossibleValue = (Math.PI * Math.PI) / 6;
    const histogramBinCount = 20;
    const histogramBins = _.range(0, 1, 1 / histogramBinCount);
    const histogramGenerator = d3
      .histogram()
      .domain([0, 1])
      .thresholds(histogramBins);

    const aggregates = dataSources.reduce((acc, ds) => {
      acc[ds.id] = {};
      return acc;
    }, {});
    dataSources.forEach(ds => {
      const dsRows = rows.map(d => d.dsScores[ds.position]);
      const dsRowsNonZero = dsRows.filter(s => s > 0);
      aggregates[ds.id].coverage = dsRowsNonZero.length / dsRows.length;
      aggregates[ds.id].histogram = histogramGenerator(
        dsRowsNonZero.map(s => s / maxPossibleValue)
      );
    });
    // console.log(indirects, dataSources, aggregates);

    return (
      <React.Fragment>
        <TopLevelControls
          indirects={indirects}
          onIndirectsChange={onIndirectsChange}
        />
        <DataTypesLegend />
        <BaseAssociationsTable
          loading={false}
          error={false}
          columns={columns(
            dataSources,
            colorScale,
            this.handleWeightChange,
            onCellClick,
            aggregates,
            evidence
          )}
          headerGroups={headerGroups(aggregates)}
          data={rows}
          filters
        />
      </React.Fragment>
    );
  }
}

export default withTheme(AssociationsTable);
