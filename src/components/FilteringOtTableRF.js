import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import crossfilter from 'crossfilter2';
import OtTableRF from './OtTableRF';
import { TextField, Typography } from '@material-ui/core';
import _ from 'lodash';

const FilteringOtTableRF = props => {
  const [filteredRows, setFilteredRows] = React.useState(props.data);
  const xf = React.useRef(crossfilter()).current;
  const dimensions = React.useRef({}).current;

  React.useEffect(
    () => {
      xf.add(props.data);
      setFilteredRows(xf.allFiltered());
      return () => {
        xf.remove();
      };
    },
    [props.data, xf]
  );

  return (
    <OtTableRF
      {...props}
      filters
      columns={props.columns.map(
        ({ filterable, dropdownFilterValue, id, ...otherFields }) => {
          if (!filterable) {
            return { id, ...otherFields };
          }
          const valueAccessor = dropdownFilterValue || (row => row[id]);
          dimensions[id] = dimensions[id] || xf.dimension(valueAccessor);
          return {
            id,
            ...otherFields,
            renderFilter: () => {
              return (
                <FilterDropdown
                  xf={xf}
                  dim={dimensions[id]}
                  valueAccessor={valueAccessor}
                  setFilteredRows={setFilteredRows}
                />
              );
            },
          };
        }
      )}
      data={filteredRows}
    />
  );
};

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
  );
};

export default FilteringOtTableRF;
