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
    id: 'clinVarId',
    label: 'ClinVar ID',
    renderCell: d => (
      <Link
        external
        to={`https://www.ncbi.nlm.nih.gov/clinvar/${d.clinVarId}/`}
      >
        {d.clinVarId}
      </Link>
    ),
  },
  {
    id: 'vepConsequence',
    label: 'Variant Type',
  },
  {
    id: 'clinicalSignificance',
    label: 'Clinical Significance',
  },
  {
    id: 'pmId',
    label: 'Publication',
    renderCell: d =>
      d.pmId ? (
        <Link external to={`http://europepmc.org/abstract/MED/${d.pmId}`}>
          {d.pmId}
        </Link>
      ) : null,
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
