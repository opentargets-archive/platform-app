import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import crossfilter from 'crossfilter2';
import Typography from '@material-ui/core/Typography';
import { DataDownloader, OtTableRF, Link } from 'ot-ui';

const getColumns = () => {
  return [
    {
      id: 'mouseGeneSymbol',
      label: 'Mouse gene',
      renderCell: row => (
        <Link
          external
          to={`http://www.informatics.jax.org/marker/${row.mouseGeneId}`}
        >
          {row.mouseGeneSymbol}
        </Link>
      ),
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
      renderCell: row => {
        return (
          <Fragment>
            <Typography align="center">
              {row.subjectAllelicComposition
                .replace(/</g, '')
                .replace(/>/g, '')}
            </Typography>
            <Typography align="center">{row.subjectBackground}</Typography>
          </Fragment>
        );
      },
    },
    {
      id: 'pmIds',
      label: 'Sources',
      renderCell: row => {
        const query = row.pmIds.map(pmId => `EXT_ID:${pmId}`).join(' OR ');
        return (
          <Link external to={`https://europepmc.org/search?query=${query}`}>
            {row.pmIds.length} publications
          </Link>
        );
      },
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
