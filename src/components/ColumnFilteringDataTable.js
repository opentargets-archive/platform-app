import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import crossfilter from 'crossfilter2';
import { TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';

import { DataTable } from './Table';

const ColumnFilteringDataTable = props => {
  const classes = useStyles();
  const [filteredRows, setFilteredRows] = React.useState(props.rows);
  const xf = React.useRef(crossfilter()).current;
  const dimensions = React.useRef({}).current;

  React.useEffect(
    () => {
      xf.add(props.rows);
      setFilteredRows(xf.allFiltered());
      return () => {
        xf.remove();
      };
    },
    [props.rows, xf]
  );

  return (
    <DataTable
      {...props}
      columns={props.columns.map(
        ({ filterable, dropdownFilterValue, ...tableFields }) => {
          const plainLabel = tableFields.label || _.startCase(tableFields.id);
          if (!filterable) {
            return {
              ...tableFields,
              // align the label above empty space as tall as the dropdowns
              label: (
                <>
                  {plainLabel}
                  <Box mb="72px" />
                </>
              ),
              exportLabel: tableFields.exportLabel || plainLabel,
            };
          }
          const valueAccessor =
            dropdownFilterValue ||
            (row =>
              _.get(row, tableFields.propertyPath || tableFields.id, 'N/A'));
          dimensions[tableFields.id] =
            dimensions[tableFields.id] || xf.dimension(valueAccessor);
          return {
            ...tableFields,
            label: (
              <>
                {plainLabel}
                <FilterDropdown
                  xf={xf}
                  dim={dimensions[tableFields.id]}
                  valueAccessor={valueAccessor}
                  setFilteredRows={setFilteredRows}
                />
              </>
            ),
            exportLabel: tableFields.exportLabel || plainLabel,
            // grow labels with dropdowns to full width even before sort arrows
            classes: {
              ...(tableFields.classes || {}),
              sortLabel: classNames(
                tableFields.classes?.sortLabel,
                classes.fullWidthSortLabel
              ),
              innerLabel: classNames(
                tableFields.classes?.innerLabel,
                classes.assertiveInnerLabel
              ),
            },
          };
        }
      )}
      rows={filteredRows}
    />
  );
};

const useStyles = makeStyles({
  fullWidthSortLabel: { width: '100%' },
  assertiveInnerLabel: { flexGrow: 1 },
});

const FilterDropdown = ({ xf, dim, valueAccessor, setFilteredRows }) => {
  const handler = (_event, selection) => {
    if (selection) {
      dim.filter(cellValue => {
        if (_.isArray(cellValue)) {
          return _.some(cellValue, arrayElement => arrayElement === selection);
        } else {
          return cellValue === selection;
        }
      });
    } else {
      dim.filterAll();
    }

    setFilteredRows(xf.allFiltered());
  };
  const cellValues = xf.allFiltered().flatMap(row => {
    const cellValue = valueAccessor(row);
    if (_.isArray(cellValue)) {
      return cellValue;
    } else {
      return [cellValue];
    }
  });
  const options = _.sortedUniq(cellValues.sort());
  return (
    <div
      onClick={event => {
        // stop clicks from bubbling up and changing the sort direction
        event.stopPropagation();
      }}
    >
      <Autocomplete
        options={options}
        onChange={handler}
        renderInput={params => (
          <TextField {...params} label="Select..." margin="normal" />
        )}
        renderOption={option => (
          <Typography style={{ fontSize: '.85rem' }}>{option}</Typography>
        )}
      />
    </div>
  );
};

export default ColumnFilteringDataTable;
