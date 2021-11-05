import React from 'react';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import Link from '../../../components/Link';
import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';
import Tooltip from '../../../components/Tooltip';
import { naLabel } from '../../../constants';
import ChipList from '../../../components/ChipList';
import { DataTable, TableDrawer } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import ClinvarStars from '../../../components/ClinvarStars';

const CHEMICAL_PROBES_QUERY = loader('./ChemicalProbes.gql');

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
    exportValue: row => row.id,
    filterValue: row => row.id,
    width: '16%',
  },
  {
    id: 'isHighQuality',
    label: 'Quality',
    renderCell: row => (
      <Tooltip title={row.isHighQuality ? 'High quality' : 'Low quality'}>
        <span>
          <ClinvarStars num={row.isHighQuality ? 1 : 0} length={1} />
        </span>
      </Tooltip>
    ),
    exportValue: row => (row.isHighQuality ? 'high' : 'low'),
    filterValue: row => (row.isHighQuality ? 1 : 0),
    tooltip:
      'Chemical probes selection based on the union of following criteria: compound belongs to one of the high-quality probe sets; use in Cells or Organisms rating ≥ 75%; P&D approved experimental probe; not labelled as obsolete.',
    width: '10%',
  },
  {
    id: 'mechanismOfAction',
    label: 'Mechanism of action',
    renderCell: row => row.mechanismOfAction?.join(', ') || naLabel,
    exportValue: row => row.mechanismOfAction?.join(', '),
    filterValue: row => row.mechanismOfAction?.join(', ') || naLabel,
    width: '16%',
  },
  {
    id: 'origin',
    label: 'Probe origin',
    renderCell: row => row.origin?.join(', ') || naLabel,
    exportValue: row => row.origin?.join(', '),
    filterValue: row => row.origin?.join(', ') || naLabel,
    width: '16%',
  },
  {
    id: 'score',
    label: 'Score',
    renderCell: row => {
      const rowScores = scores.filter(s => row[s.field] !== null);
      return rowScores?.length > 0 ? (
        <ChipList
          items={rowScores.map(s => ({
            label: s.label + ': ' + Number(row[s.field]).toPrecision(),
            tooltip: (
              <>
                <TooltipStyledLabel label="Score" value={row[s.field]} />
                <TooltipStyledLabel label="Description" value={s.description} />
              </>
            ),
          }))}
        />
      ) : (
        <ChipList items={[{ label: 'Not available' }]} />
      );
    },
    exportValue: row =>
      scores
        .filter(s => row[s.field] !== null)
        .map(s => s.label + ': ' + row[s.field])
        .join(', '),
    filterValue: row =>
      scores
        .filter(s => row[s.field] !== null)
        .map(s => s.label + ': ' + row[s.field])
        .join(', ') || naLabel,
    width: '26%',
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
    exportValue: row => row.urls.map(u => u.niceName + ': ' + u.url).join(', '),
    filterValue: row =>
      row.urls
        .map(u => u.niceName + ': ' + u.url)
        .concat(row.urls.length > 1 ? [`${row.urls.length} entries`] : [])
        .join(', '),
    width: '16%',
  },
];

function Body({ definition, id, label: symbol }) {
  const variables = { ensemblId: id };
  const request = useQuery(CHEMICAL_PROBES_QUERY, { variables });

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={data => {
        // sort probes manually as we need a double custom sort based on quality and origin
        const sortedProbes = _.sortBy(data.target.chemicalProbes, [
          p => !p.isHighQuality,
          p => !p.origin?.map(o => o.toLowerCase()).includes('experimental'),
        ]);
        return data.target.chemicalProbes?.length > 0 ? (
          <DataTable
            columns={columns}
            rows={sortedProbes}
            showGlobalFilter
            dataDownloader
            dataDownloaderFileStem={`${symbol}-chemical-probes`}
            fixed
            rowsPerPageOptions={defaultRowsPerPageOptions}
            noWrap={false}
            noWrapHeader={false}
            query={CHEMICAL_PROBES_QUERY.loc.source.body}
            variables={variables}
          />
        ) : null;
      }}
    />
  );
}

export default Body;
