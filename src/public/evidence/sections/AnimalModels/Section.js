import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

import MouseModelAllelicComposition from '../../../common/MouseModelAllelicComposition';

const columns = [
  {
    id: 'disease.id',
    label: 'Disease',
    renderCell: d => (
      <Link to={`/disease/${d.disease.id}`}>{d.disease.name}</Link>
    ),
  },
  {
    id: 'humanPhenotypes',
    label: 'Human phenotypes',
    renderCell: d => (
      <ul>
        {d.humanPhenotypes.map(p => (
          <li key={p.id}>
            <Link external to={p.url}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'modelPhenotypes',
    label: 'Mouse phenotypes',
    renderCell: d => (
      <ul>
        {d.modelPhenotypes.map(p => (
          <li key={p.id}>
            <Link external to={p.url}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'modelModel',
    label: 'Mouse model',
    renderCell: d => (
      <MouseModelAllelicComposition
        allelicComposition={[d.allelicComposition]}
        geneticBackground={d.geneticBackground}
      />
    ),
  },
  {
    id: 'source.url',
    label: 'Evidence source',
    renderCell: d => (
      <Link external to={d.source.url}>
        {d.source.name}
      </Link>
    ),
  },
];

const Section = ({ ensgId, efoId, data }) => (
  <OtTableRF loading={false} error={false} columns={columns} data={data.rows} />
);

export default Section;
