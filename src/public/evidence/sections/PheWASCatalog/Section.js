import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, OtTableRF } from 'ot-ui';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link component={RouterLink} to={`/disease/${d.disease.id}`}>
        {d.disease.name}
      </Link>
    ),
  },
  {
    id: 'rsId',
    label: 'Variant',
    renderCell: d => (
      <Link
        external
        to={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${d.rsId}`}
      >
        {d.rsId}
      </Link>
    ),
  },
  {
    id: 'vepConsequence',
    label: 'Variant Type',
  },
  {
    id: 'pval',
    label: 'P-value',
  },
  {
    id: 'oddsRatio',
    label: 'Odds Ratio',
    renderCell: d => (
      <React.Fragment>
        {d.oddsRatio}
        {d.confidenceInterval ? (
          <React.Fragment>
            <br />
            {d.confidenceInterval}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    ),
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
