import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import { withTheme } from '@material-ui/core';

// import { Link } from 'ot-ui';

import {
  dataSourcesOrderAlphabetical,
  calculateAggregations,
} from '../DynamicAssociations/configuration';
import { HeatmapTable } from '../Heatmap';
import DataTypesLegend from '../DynamicAssociations/DataTypesLegend';
import TopLevelControls from '../DynamicAssociations/TopLevelControls';
import getDataSourcesColumns from '../DynamicAssociations/getDataSourcesColumns';
import getHeaderGroups from '../DynamicAssociations/getHeaderGroups';

const hideEmptyColumns = true;

const columns = ({
  firstColumnName,
  dataSources,
  theme,
  handleWeightChange,
  handleCellClick,
  aggregates,
  evidence,
}) => [
  {
    id: firstColumnName,
    label: firstColumnName,
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
    firstColumnName,
    hideEmptyColumns,
    dataSources,
    theme,
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
    const newDataSources = dataSourcesOrderAlphabetical.map(ds =>
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
      const newDataSources = dataSourcesOrderAlphabetical.map(ds =>
        newDataSourcesUnordered.find(d => d.id === ds)
      );
      const newOptions = metadata.options;

      onDataSourcesChange({ dataSources: newDataSources, options: newOptions });
    }
  }
  render() {
    const {
      firstColumnName,
      theme,
      rows,
      indirects,
      dataSources,
      evidence,
      onIndirectsChange,
      onCellClick,
    } = this.props;

    const aggregates = calculateAggregations({ dataSources, rows });

    return (
      <React.Fragment>
        <TopLevelControls
          indirects={indirects}
          onIndirectsChange={onIndirectsChange}
        />
        <DataTypesLegend />
        <HeatmapTable
          loading={false}
          error={false}
          columns={columns({
            firstColumnName,
            dataSources,
            theme,
            handleWeightChange: this.handleWeightChange,
            handleCellClick: onCellClick,
            aggregates,
            evidence,
          })}
          headerGroups={getHeaderGroups({ aggregates, hideEmptyColumns })}
          data={rows}
          filters
        />
      </React.Fragment>
    );
  }
}

export default withTheme(AssociationsTable);
