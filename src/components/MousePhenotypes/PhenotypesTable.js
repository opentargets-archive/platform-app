import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import { DataDownloader, OtTableRF } from 'ot-ui';

const getColumns = () => {
  return [
    {
      id: 'mouseGeneSymbol',
      label: 'Mouse gene',
    },
    {
      id: 'categoryLabel',
      label: 'Phenotype category',
    },
    {
      id: 'phenotypeLabel',
      label: 'Phenotype label',
    },
    {
      id: 'subjectAllelicComposition',
      label: 'Allelic composition',
    },
  ];
};

class PhenotypesTable extends Component {
  render() {
    const { rows } = this.props;
    const columns = getColumns();
    return (
      <Fragment>
        <DataDownloader />
        <OtTableRF filters columns={columns} data={rows} />
      </Fragment>
    );
  }
}

export default PhenotypesTable;
