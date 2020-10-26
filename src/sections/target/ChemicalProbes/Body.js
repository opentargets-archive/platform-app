import React from 'react';
import { Typography } from '@material-ui/core';

import { Link, OtTableRF, DataDownloader } from 'ot-ui';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Description from './Description';

const columns = [
  {
    id: 'chemicalprobe',
    label: 'Probe',
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: rowData =>
      rowData.sourcelinks.map((d, i, a) => (
        <React.Fragment key={i}>
          <Link external to={d.link}>
            {d.source}
          </Link>
          {i < a.length - 1 ? ' / ' : ''}
        </React.Fragment>
      )),
    export: rowData => rowData.sourcelinks.map(d => d.link).join(', '),
  },
  {
    id: 'note',
    label: 'Notes',
  },
];

function Body({ definition, id: ensgId, label: approvedSymbol }) {
  const request = usePlatformApi();

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description label={approvedSymbol} />}
      renderBody={data => {
        const { probeminer, rows } = data.target.chemicalProbes;

        return (
          <>
            {rows.length > 0 ? (
              <>
                <DataDownloader
                  tableHeaders={columns}
                  rows={data.rows}
                  fileStem={`${approvedSymbol}-chemical-probes`}
                />
                <OtTableRF columns={columns} data={rows} />
              </>
            ) : null}
            {probeminer ? (
              <>
                <Typography variant="body2">
                  Potential chemical probes can be explored with{' '}
                  <Link external to={data.probeminer}>
                    ProbeMiner
                  </Link>
                  .
                </Typography>
              </>
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;
