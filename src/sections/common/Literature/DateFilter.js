import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import MomentFn from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import {
  fetchSimilarEntities,
  literatureState,
  loadingEntitiesState,
  litsIdsState,
  updateLiteratureState,
} from './atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { GREATER_THAN, LESSER_THAN } from '.';

export const DateFilter = () => {
  const [filterDate, setFilterDate] = useState(null);
  const setLiteratureUpdate = useSetRecoilState(updateLiteratureState);
  const [loadingEntities, setLoadingEntities] = useRecoilState(
    loadingEntitiesState
  );
  const {
    query,
    id,
    category,
    year,
    month,
    comparator,
    selectedEntities,
    globalEntity,
    cursor,
  } = useRecoilValue(literatureState);

  useEffect(
    () => {
      debugger;
      if (year) {
        setFilterDate(new Date(year, month, 1));
      } else {
        setFilterDate(null);
      }
    },
    [year, month]
  );

  useEffect(
    () => {
      console.log(comparator);
    },
    [comparator]
  );

  const handleDateChange = date => {
    if (date) {
      const year = date.year();
      const month = date.month() + 1;
      let comp = comparator ?? GREATER_THAN;
      handleChange({ year, month, comparator: comp });
    } else {
      handleChange({ year: null, month: null });
    }
    setFilterDate(date);
  };

  const handleChange = async values => {
    setLoadingEntities(true);
    const request = await fetchSimilarEntities({
      query,
      id,
      category,
      entities: selectedEntities,
      cursor,
      year,
      month,
      comparator,
      ...values,
    });
    const data = request.data[globalEntity];
    const update = {
      entities: data.similarEntities,
      loadingEntities: false,
      category,
      year,
      month,
      comparator,
      litsIds: data.literatureOcurrences?.rows?.map(({ pmid }) => ({
        id: pmid,
        status: 'ready',
        publication: null,
      })),
      litsCount: data.literatureOcurrences?.count,
      ...values,
    };
    setLiteratureUpdate(update);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <InputLabel id="date-filter-demo">Date Filter:</InputLabel>
      <FormGroup row>
        <FormControl style={{ marginLeft: '15px', flex: 1 }}>
          <MuiPickersUtilsProvider utils={MomentFn}>
            <DatePicker
              views={['year', 'month']}
              label="Year and Month"
              value={filterDate}
              onChange={handleDateChange}
              autoOk={true}
              renderInput={params => (
                <TextField {...params} helperText={null} />
              )}
              maxDate={Date.now()}
              clearable={true}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl style={{ marginLeft: '15px', flex: 1 }}>
          <InputLabel id="compare-label">Compare logic</InputLabel>
          <Select
            labelId="compare-label"
            id="demo-simple-select-helper"
            value={comparator}
            onChange={event => handleChange({ comparator: event.target.value })}
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={GREATER_THAN}>Greater Than</MenuItem>
            <MenuItem value={LESSER_THAN}>Lesser Than</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </div>
  );
};
