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
          options={hallmarksOptions}
          onChange={hallmarksFilterHandler}
        />
      ),
    },
    {
      id: 'activity',
      label: 'Promotes or suppresses',
      renderCell: row => row.activity,
      renderFilter: () => (
        <Select
          isClearable
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
          1&nbsp;publication
        </Link>
      ),
    },
  ];
};

const downloadColumns = [
  { id: 'name', label: 'Hallmarks' },
  { id: 'activity', label: 'Promotes or suppresses' },
  { id: 'description', label: 'Description' },
  { id: 'pmId', label: 'Sources (PubMed id)' },
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
    // initialize filteredrows to rows: we also map each entry
    // and generate a convenience 'activity' field to then filter on
    filteredRows: this.props.rows.map(r => ({
      name: r.name,
      activity: r.promotes ? 'promotes' : r.suppresses ? 'suppresses' : '',
      description: r.description,
      pmId: r.pmId,
    })),
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
    // Initialize the xfilter with filteredrows:
    // this is only done at hte beginning and hence stores the full data rows
    this.hallmarksXf = crossfilter(this.state.filteredRows);
    this.hallmarksDim = this.hallmarksXf.dimension(row => row.name);
    this.promotesDim = this.hallmarksXf.dimension(row => row.activity);
  }

  render() {
    const { symbol } = this.props;
    const { filteredRows } = this.state;

    // At this point filteredrows is the mapped rows from the props.
    const columns = getColumns(
      getHallmarksOptions(filteredRows),
      this.hallmarksFilterHandler,
      getPromotesOptions(filteredRows),
      this.promotesFilterHandler
    );

    return (
      <Fragment>
        <DataDownloader
          tableHeaders={downloadColumns}
          rows={filteredRows}
          fileStem={`${symbol}-hallmarks`}
        />
        <OtTableRF columns={columns} data={filteredRows} filters />
      </Fragment>
    );
  }
}

export default HallmarksTable;
