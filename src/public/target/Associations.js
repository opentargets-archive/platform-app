import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Link, significantFigures } from 'ot-ui';
import AssociationsTable from '../common/AssociationsTable';

const targetAssociationsQuery = gql`
  query TargetAssociationsQuery($ensgId: String!, $indirects: Boolean!) {
    associationsByTargetId(targetId: $ensgId, indirects: $indirects) {
      metadata {
        options {
          maxVectorElements
          pExponent
          reduceFunc
        }
        dsOptions {
          id
          weight
          reduceFunc
        }
      }
      rows {
        obj {
          id
          name
        }
        score
        dsScores
        evsCount
      }
    }
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-dora-dot-open-targets-eu-dev.appspot.com/graphql',
  }),
  cache: new InMemoryCache(),
});

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

const columns = (dataSources, colorScale) => [
  {
    id: 'disease',
    label: 'Disease',
    ellipsisWidth: '100px',
    renderCell: d => (
      <Link to={`/disease/${d.obj.id}`}>
        <span style={{ textOverflow: 'ellipsis' }}>{d.obj.name}</span>
      </Link>
    ),
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
    renderFilter: () => (
      <React.Fragment>
        <Checkbox checked={true} value={'checked'} color="primary" />
        <VerticalSlider
          orientation="vertical"
          getAriaValueText={value => `Weight: ${significantFigures(value)}`}
          defaultValue={0}
          step={0.01}
          min={0}
          max={1}
          aria-labelledby="vertical-slider"
        />
      </React.Fragment>
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

const TargetAssociationsPage = ({ ensgId, theme }) => {
  const colorScale = d3
    .scaleLinear()
    .domain([0, Math.PI ** 2 / 6])
    .range(['#fff', theme.palette.primary.main]);
  return (
    <ApolloProvider client={client}>
      <Query
        query={targetAssociationsQuery}
        variables={{ ensgId, indirects: true }}
      >
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          }
          const { rows, metadata } = data.associationsByTargetId;
          const { dsOptions: dataSourcesRaw } = metadata;
          const dataSources = dataSourcesRaw.map((d, i) => ({
            ...d,
            name: _.startCase(d.id.split('__')[1]),
            position: i,
          }));
          const dataSourcesOrdered = dataSourcesOrder.map(ds =>
            dataSources.find(d => d.id === ds)
          );

          /* return (
            <AssociationsTable
              loading={false}
              error={false}
              columns={columns(dataSources, colorScale)}
              data={rows}
            />
          ); */

          return (
            <React.Fragment>
              <DataTypesLegend dataTypes={dataTypes} />
              <AssociationsTable
                loading={false}
                error={false}
                columns={columns(dataSourcesOrdered, colorScale)}
                headerGroups={headerGroups}
                data={rows}
                filters
              />
            </React.Fragment>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default withTheme(TargetAssociationsPage);
