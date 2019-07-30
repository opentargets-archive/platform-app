import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Link, significantFigures } from 'ot-ui';

import BaseAssociationsTable from '../common/AssociationsTable';

const VerticalSlider = withStyles(theme => ({
  root: {
    height: '70px',
    width: '24px',
    maxWidth: '24px',
    marginTop: '8px',
    marginBottom: '16px',
    display: 'inline-block',
  },
}))(({ classes, ...rest }) => (
  <div className={classes.root}>
    <Slider {...rest} />
  </div>
));

const HeatmapCell = ({ value, colorScale }) => {
  const a = 'white';
  const b = '#E0E0E0';
  return (
    <span
      style={{
        display: 'inline-block',
        width: '16px',
        height: '16px',
        border: `1px solid ${b}`,
        background:
          value > 0
            ? colorScale(value)
            : `repeating-linear-gradient(45deg,${a},${a} 2px,${b} 2px,${b} 4px)`,
      }}
      title={`Score: ${value > 0 ? significantFigures(value) : 'N/A'}`}
    />
  );
};

const columns = (dataSources, colorScale, handleWeightChange) => [
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
  ...dataSources.map(c => ({
    id: c.id,
    label: c.name,
    verticalHeader: true,
    align: 'center',
    firstInHeaderGroup: dataTypes.some(dt => dt.dataSources[0] === c.id),
    lastInHeaderGroup: dataTypes.some(
      dt => dt.dataSources[dt.dataSources.length - 1] === c.id
    ),
    renderCell: d => (
      <HeatmapCell value={d.dsScores[c.position]} colorScale={colorScale} />
    ),
    renderFilter: d => (
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
const headerGroups = [
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
    colspan: d.dataSources.length,
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
        <React.Fragment>
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
        onChange={onIndirectsChange}
        color="primary"
      />
      <span style={{ marginLeft: '6px', marginRight: '20px' }}>
        Use indirect evidence
      </span>
    </Typography>
  </div>
);

class AssociationsTable extends React.Component {
  state = {};
  static getDerivedStateFromProps({ metadata }) {
    const { dsOptions, options } = metadata || {};

    let dataSources = [];
    if (dsOptions) {
      const dataSourcesUnordered = dsOptions.map((d, i) => ({
        ...d,
        name: _.startCase(d.id.split('__')[1]),
        position: i,
      }));
      dataSources = dataSourcesOrder.map(ds =>
        dataSourcesUnordered.find(d => d.id === ds)
      );
    }

    return { dataSources, options };
  }
  handleWeightChange = (d, value) => {
    const { onUpdate } = this.props;
    const { dataSources, options } = this.state;
    const dsOptions = dataSources
      .map(ds => {
        if (ds.id === d.id) {
          return {
            ...ds,
            weight: value,
          };
        } else {
          return ds;
        }
      })
      .map(({ id, weight, reduceFunc }) => ({ id, weight, reduceFunc }));

    // have to strip __typename when using as input (__typename added by cache)
    const { __typename, ...optionsMinusTypename } = options;
    const harmonicOptions = {
      dsOptions: dsOptions.map(({ __typename, ...rest }) => ({
        ...rest,
      })),
      options: optionsMinusTypename,
    };
    onUpdate({ harmonicOptions });
  };
  onIndirectsChange = event => null;
  // this.setState({ indirects: event.target.checked });
  render() {
    const { rows, theme } = this.props;
    const { dataSources } = this.state;
    const indirects = true;

    const colorScale = d3
      .scaleLinear()
      .domain([0, Math.PI ** 2 / 6])
      .range(['#fff', theme.palette.primary.main]);
    return (
      <React.Fragment>
        <TopLevelControls
          indirects={indirects}
          onIndirectsChange={this.onIndirectsChange}
        />
        <DataTypesLegend dataTypes={dataTypes} />
        <BaseAssociationsTable
          loading={false}
          error={false}
          columns={columns(dataSources, colorScale, this.handleWeightChange)}
          headerGroups={headerGroups}
          data={rows}
          filters
        />
      </React.Fragment>
    );
  }
}

/* dataSourcesOrder.reduce((acc, d) => {
      acc[d] = {
        weight: null,
        isEnabled: true,
      };
      return acc;
    }, {}), */

export default withTheme(AssociationsTable);
