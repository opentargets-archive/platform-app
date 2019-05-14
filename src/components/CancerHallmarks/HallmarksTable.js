import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

import { OtTableRF, DataDownloader, Link } from 'ot-ui';

const getColumns = (
  hallmarksOptions,
  hallmarksFilterHandler,
  promotesOptions,
  promotesFilterHandler
) => {
  return [
    {
      id: 'hallmark',
      label: 'Hallmarks',
      renderCell: row => row.name,
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={hallmarksOptions}
          onChange={hallmarksFilterHandler}
        />
      ),
    },
    {
      id: 'updown',
      label: 'Promotes or suppresses',
      renderCell: row => row.activity,
      renderFilter: () => (
        <Select
          isClearable
          placeholder="None"
          options={promotesOptions}
          onChange={promotesFilterHandler}
        />
      ),
    },
    {
      id: 'description',
      label: 'Description',
      renderCell: row => row.description,
    },
    {
      id: 'sources',
      label: 'Sources',
      renderCell: row => (
        <Link
          external
          to={`http://europepmc.org/search?query=EXT_ID:${row.pmId}`}
        >
          1&nbsp;Publication
        </Link>
      ),
    },
  ];
};

const downloadColumns = [
  { id: 'hallmark', label: 'Hallmarks' },
  { id: 'updown', label: 'Promotes or suppresses' },
  { id: 'description', label: 'Description' },
  { id: 'sources', label: 'Sources' },
];

const getHallmarksOptions = rows => {
  return _.uniqBy(rows, 'name').map(row => ({
    label: row.name,
    value: row.name,
  }));
};

const getPromotesOptions = rows => {
  return _.uniqBy(rows, 'activity').map(row => ({
    label: row.activity,
    value: row.activity,
  }));
};

class HallmarksTable extends Component {
  state = {
    filteredRows: this.props.rows,
  };

  hallmarksFilterHandler = selection => {
    const { hallmarksXf, hallmarksDim } = this;

    if (selection) {
      hallmarksDim.filter(d => d === selection.value);
    } else {
      hallmarksDim.filterAll();
    }

    this.setState({ filteredRows: hallmarksXf.allFiltered() });
  };

  promotesFilterHandler = selection => {
    const { hallmarksXf, promotesDim } = this;

    if (selection) {
      promotesDim.filter(d => d === selection.value);
    } else {
      promotesDim.filterAll();
    }

    this.setState({ filteredRows: hallmarksXf.allFiltered() });
  };

  componentDidMount() {
    this.hallmarksXf = crossfilter(this.props.rows);
    this.hallmarksDim = this.hallmarksXf.dimension(row => row.name);
    this.promotesDim = this.hallmarksXf.dimension(row => row.activity);
  }

  render() {
    const { symbol, rows } = this.props;
    const { filteredRows } = this.state;
    const hallmarksOptions = getHallmarksOptions(rows);
    const promotesOptions = getPromotesOptions(rows);

    const columns = getColumns(
      hallmarksOptions,
      this.hallmarksFilterHandler,
      promotesOptions,
      this.promotesFilterHandler
    );

    return (
      <Fragment>
        {/* <DataDownloader
          tableHeaders={downloadColumns}
          rows={filteredRows}
          fileStem={`${symbol}-hallmarks`}
        /> */}
        <OtTableRF columns={columns} data={filteredRows} filters />
      </Fragment>
    );
  }
}

export default HallmarksTable;
