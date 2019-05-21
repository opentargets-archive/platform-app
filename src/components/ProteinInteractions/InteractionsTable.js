import React from 'react';

import { Link, OtTableRF } from 'ot-ui';

import SourceChip from './SourceChip';
import { generateComparatorFromAccessor } from '../../utils/comparators';

const columns = interactionTypes => [
  {
    id: 'source',
    label: 'Source',
    renderCell: d => {
      const { ensgId, symbol } = d.sourceNode;
      return <Link to={`target/${ensgId}`}>{symbol}</Link>;
    },
    comparator: generateComparatorFromAccessor(d => d.sourceNode.symbol),
  },
  {
    id: 'target',
    label: 'Target',
    renderCell: d => {
      const { ensgId, symbol } = d.targetNode;
      return <Link to={`target/${ensgId}`}>{symbol}</Link>;
    },
    comparator: generateComparatorFromAccessor(d => d.targetNode.symbol),
  },
  {
    id: 'sources',
    label: 'Sources',
    renderCell: d => (
      <React.Fragment>
        {interactionTypes.enzymeSubstrate
          ? d.enzymeSubstrateSources.map(s => (
              <SourceChip sourceType="enzymeSubstrate" key={s} label={s} />
            ))
          : null}
        {interactionTypes.pathways
          ? d.pathwaysSources.map(s => (
              <SourceChip sourceType="pathways" key={s} label={s} />
            ))
          : null}
        {interactionTypes.ppi
          ? d.ppiSources.map(s => (
              <SourceChip sourceType="ppi" key={s} label={s} />
            ))
          : null}
      </React.Fragment>
    ),
  },
  {
    id: 'pmIds',
    label: 'Reference',
    renderCell: d =>
      d.pmIds.length > 0 ? (
        <Link
          external
          to={`https://europepmc.org/search?query=${d.pmIds
            .map(r => `EXT_ID:${r}`)
            .join(' OR ')}`}
        >
          {d.pmIds.length} publication
          {d.pmIds.length > 1 ? 's' : null}
        </Link>
      ) : null,
  },
];

const InteractionsTable = ({ data, interactionTypes }) => (
  <OtTableRF columns={columns(interactionTypes)} data={data} />
);

export default InteractionsTable;
