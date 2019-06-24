import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Link, OtTableRF, DataDownloader } from 'ot-ui';

const columns = [
  {
    id: 'chemicalProbe',
    label: 'Probe',
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData => (
      <React.Fragment>
        {rowData.sources.map((d, i, a) => (
          <React.Fragment key={i}>
            <Link external to={d.url}>
              {d.name}
            </Link>
            {i < a.length - 1 ? ' / ' : ''}
          </React.Fragment>
        ))}
      </React.Fragment>
    ),
    export: rowData => rowData.sources.map(d => d.url).join(', '),
  },
  {
    id: 'note',
    label: 'Notes',
  },
];

const Section = ({ ensgId, symbol, data }) => (
  <React.Fragment>
    {data.rows.length > 0 ? (
      <React.Fragment>
        <DataDownloader
          tableHeaders={columns}
          rows={data.rows}
          fileStem={`${symbol}-chemical-probes`}
        />
        <OtTableRF columns={columns} data={data.rows} />
      </React.Fragment>
    ) : null}
    {data.probeMinerUrl ? (
      <React.Fragment>
        <Typography>
          Potential chemical probes can be explored with{' '}
          <Link external to={data.probeMinerUrl}>
            ProbeMiner
          </Link>
          .
        </Typography>
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default Section;
