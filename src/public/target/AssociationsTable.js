import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';

import { Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Link, significantFigures } from 'ot-ui';

import BaseAssociationsTable from '../common/AssociationsTable';
import VerticalSlider from '../common/VerticalSlider';
import HeatmapCell from '../common/HeatmapCell';

const hideEmptyColumns = true;

class Histogram extends React.Component {
  update = () => {
    const { id, data } = this.props;
    const maxLength = d3.max(data, d => d.length);
    const barsContainer = d3.select(`#histogram-${id} g`);

    const bars = barsContainer.selectAll('rect').data(data);

    bars
      .enter()
      .append('rect')
      .merge(bars)
      .attr('x', d => 1 - (maxLength ? d.length / maxLength : 0))
      .attr('y', d => 1 - d.x1)
      .attr('width', d => (maxLength ? d.length / maxLength : 0))
      .attr('height', d => d.x1 - d.x0);

    bars.exit().remove();
  };
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }
  render() {
    const { id, color } = this.props;
    return (
      <svg
        id={`histogram-${id}`}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
      >
        <g fill={color} />
        <g>
          <line x1="1" y1="0" x2="1" y2="1" stroke="#ccc" strokeWidth="0.04" />
        </g>
      </svg>
    );
  }
}

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

const dataTypes = [
  {
    name: 'Genetic associations',
    dataSources: [
      'ds__phewas_catalog',
      'ds__gwas_catalog',
      'ds__uniprot',
      'ds__genomics_england',
      'ds__eva',
      'ds__uniprot_literature',
    ],
  },
  {
    name: 'Somatic mutations',
    dataSources: [
      'ds__cancer_gene_census',
      'ds__intogen',
      'ds__eva_somatic',
      'ds__uniprot_somatic',
    ],
  },
  { name: 'Drugs', dataSources: ['ds__chembl'] },
  {
    name: 'Pathways and systems biology',
    dataSources: ['ds__slapenrich', 'ds__progeny', 'ds__reactome'],
  },
  { name: 'RNA expression', dataSources: ['ds__expression_atlas'] },
  { name: 'Text mining', dataSources: ['ds__europepmc'] },
  { name: 'Animal models', dataSources: ['ds__phenodigm'] },
];

// TODO: datatypes to datasources mapping should come from api
var dataTypesColorScale = d3
  .scaleOrdinal(d3.schemeCategory10)
  .domain(dataTypes.map(d => d.name));
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

const dataSourcesOrder = dataTypes.reduce((acc, dt) => {
  return acc.concat(dt.dataSources);
}, []);

const DataTypesLegend = ({ dataTypes }) => (
  <div
    style={{
      marginTop: '8px',
      marginBottom: '8px',
    }}
  >
    <Typography variant="subtitle2">
      {dataTypes.map(d => (
        <React.Fragment key={d.id}>
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '8px',
              verticalAlign: 'middle',
              background: dataTypesColorScale(d.name),
            }}
          />
          <span style={{ marginLeft: '6px', marginRight: '20px' }}>
            {d.name}
          </span>
        </React.Fragment>
      ))}
    </Typography>
  </div>
);

const TopLevelControls = ({ indirects, onIndirectsChange }) => (
  <div
    style={{
      marginTop: '8px',
      marginBottom: '8px',
    }}
  >
    <Typography variant="subtitle2">
      <Checkbox
        checked={indirects}
        value={true}
        onChange={(event, value) => onIndirectsChange(value)}
        color="primary"
      />
      <span style={{ marginLeft: '6px', marginRight: '20px' }}>
        Use indirect evidence
      </span>
    </Typography>
  </div>
);

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
        <DataTypesLegend dataTypes={dataTypes} />
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
