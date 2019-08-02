import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import withTheme from '@material-ui/core/styles/withTheme';

// import { Link } from 'ot-ui';

import {
  dataSourcesOrder,
  calculateAggregations,
} from '../common/dynamicAssociations/configuration';
import BaseAssociationsTable from '../common/AssociationsTable';
import DataTypesLegend from '../common/dynamicAssociations/DataTypesLegend';
import TopLevelControls from '../common/dynamicAssociations/TopLevelControls';
import getDataSourcesColumns from '../common/dynamicAssociations/getDataSourcesColumns';
import getHeaderGroups from '../common/dynamicAssociations/getHeaderGroups';

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
  ...getDataSourcesColumns({
    hideEmptyColumns,
    dataSources,
    colorScale,
    handleWeightChange,
    handleCellClick,
    aggregates,
    evidence,
  }),
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

    const aggregates = calculateAggregations({ dataSources, rows });

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
          headerGroups={getHeaderGroups({ aggregates, hideEmptyColumns })}
          data={rows}
          filters
        />
      </React.Fragment>
    );
  }
}

export default withTheme(AssociationsTable);
