import React, { Component } from 'react';
import crossfilter from 'crossfilter2';
import { OtTable } from 'ot-ui';

const columns = [
  { id: 'biomarker', label: 'Biomarker' },
  {
    id: 'diseases',
    label: 'Disease',
    renderCell: rowData => {
      return rowData.diseases.map(disease => disease.efoLabel).join(', ');
    },
  },
  { id: 'drugName', label: 'Drug' },
  { id: 'associationType', label: 'Association' },
  { id: 'evidenceLevel', label: 'Evidence' },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData => {
      const result = rowData.sources.map(source => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.label}
        </a>
      ));
      return result;
    },
  },
];

class CancerBiomarkersDetails extends Component {
  render() {
    const { rows } = this.props;
    console.log('rows', rows);
    return <OtTable columns={columns} data={rows} />;
  }
}

export default CancerBiomarkersDetails;
