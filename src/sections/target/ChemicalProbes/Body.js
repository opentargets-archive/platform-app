import React from 'react';
import { Typography } from '@material-ui/core';

import Link from '../../../components/Link';
import OtTableRF from '../../../components/OtTableRF';
import DataDownloader from '../../../components/DataDownloader';
import SectionItem from '../../../components/Section/SectionItem';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Description from './Description';
import Tooltip from '../../../components/Tooltip';
import { naLabel } from '../../../constants';
import ChipList from '../../../components/ChipList';
import { TableDrawer } from '../../../components/Table';

const scores = [
  {
    field: 'probeMinerScore',
    label: 'Probe Miner',
    description:
      'The Probe Miner score is the sum of 6 parameters: target potency, target selectivity, cell potency, structure-activity relationships (SAR), inactive analogs and pan-assay interference (PAINS).',
  },
  {
    field: 'probesDrugScore',
    label: 'Drugs',
    description:
      'The P&D probe-likeness score is the sum of 6 parameters: target potency, target selectivity, cell potency, potency-selectivity synergy, presence of a control compound and presence of an orthogonal probe.',
  },
  {
    field: 'scoreInCells',
    label: 'Cells',
    description:
      'The organism score ranks the chemical probe for its use in model cells.',
  },
  {
    field: 'scoreInOrganisms',
    label: 'Organisms',
    description:
      'The organism score ranks the chemical probe for its use in model organisms.',
  },
];

/**
 * Style the tooltips as "label: value" with a bold label
 */
const TooltipStyledLabel = ({ label, value }) => {
  return (
    <Typography variant="body2">
      <span style={{ fontWeight: 'bold' }}>{label}:</span> {value}
    </Typography>
  );
};

const columns = [
  {
    id: 'id',
    label: 'Probe ID',
    renderCell: row => {
      // link to drug page if drugid is available; also add tooltip with control if available
      const c = row.drugId ? (
        <Link to={`/drug/${row.drugId}`}>{row.id}</Link>
      ) : (
        <span>{row.id}</span>
      );
      return row.control ? (
        <Tooltip
          title={<TooltipStyledLabel label="Control" value={row.control} />}
          showHelpIcon
        >
          {c}
        </Tooltip>
      ) : (
        c
      );
    },
    // export: rowData => rowData.sourcelinks.map(d => d.link).join(', '),
  },
  {
    id: 'targetFromSourceId',
    label: 'Reported target',
    renderCell: row => (
      <Link
        external
        to={`https://identifiers.org/uniprot:${row.targetFromSourceId}`}
      >
        {row.targetFromSourceId}
      </Link>
    ),
  },
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of action',
    renderCell: row => row.mechanismOfAction?.join(', ') || naLabel,
  },
  {
    id: 'origin',
    label: 'Probe origin',
    renderCell: row => row.origin?.join(', ') || naLabel,
  },
  {
    id: 'score',
    label: 'Score',
    renderCell: row => {
      const rowScores = scores.filter(s => row[s.field] !== null);
      return rowScores ? (
        <ChipList
          items={rowScores.map(s => ({
            label: s.label + ': ' + row[s.field],
            tooltip: (
              <>
                <TooltipStyledLabel label="Score" value={row[s.field]} />
                <TooltipStyledLabel label="Description" value={s.description} />
              </>
            ),
          }))}
        />
      ) : (
        naLabel
      );
    },
  },
  {
    id: 'sources',
    label: 'Reference',
    renderCell: row => {
      return row.urls ? (
        <TableDrawer
          entries={row.urls.map(u => ({
            name: u.niceName,
            url: u.url,
            group: 'literature',
          }))}
        />
      ) : (
        naLabel
      );
    },
  },
];

function Body({ definition, label: symbol }) {
  const request = usePlatformApi();

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        return (
          <>
            {data.target.chemicalProbes?.length > 0 ? (
              <>
                <DataDownloader
                  tableHeaders={columns}
                  rows={data.target.chemicalProbes}
                  fileStem={`${symbol}-chemical-probes`}
                />
                <OtTableRF
                  columns={columns}
                  data={data.target.chemicalProbes}
                />
              </>
            ) : null}
          </>
        );
      }}
    />
  );
}

export default Body;
