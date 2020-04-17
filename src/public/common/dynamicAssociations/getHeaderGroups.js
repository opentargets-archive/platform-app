import React from 'react';

import { dataTypes, dataTypesColorScale } from './configuration';

const getHeaderGroups = ({ aggregates, hideEmptyColumns }) => [
  { renderCell: () => null, colspan: 2 },
  ...dataTypes.map((d) => ({
    renderCell: () => (
      <div
        style={{
          width: '100%',
          height: '8px',
          background: dataTypesColorScale(d.name),
        }}
      />
    ),
    colspan: d.dataSources.filter((ds) =>
      hideEmptyColumns ? aggregates[ds] && aggregates[ds].coverage > 0 : true
    ).length,
  })),
];

export default getHeaderGroups;
