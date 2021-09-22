import React from 'react';
import { loader } from 'graphql.macro';

import { Body as KnownDrugsBody } from '../../common/KnownDrugs';
import Description from './Description';
import { sentenceCase } from '../../../utils/global';

const KNOWN_DRUGS_BODY_QUERY = loader('./KnownDrugsQuery.gql');

const exportColumns = id => [
  {
    label: 'drugId',
    exportValue: row => row.drug.id,
  },
  {
    label: 'drugName',
    exportValue: row => row.drug.name,
  },
  {
    label: 'type',
    exportValue: row => row.drugType,
  },
  {
    label: 'mechanismOfAction',
    exportValue: row => row.mechanismOfAction,
  },
  {
    label: 'actionType',
    exportValue: ({ drug: { mechanismsOfAction } }) => {
      if (!mechanismsOfAction) return '';
      const at = new Set();
      mechanismsOfAction.rows.forEach(row => {
        row.targets.forEach(t => {
          if (t.id === id) {
            at.add(row.actionType);
          }
        });
      });
      const actionTypes = Array.from(at);
      return actionTypes.map(actionType => sentenceCase(actionType));
    },
  },
  {
    label: 'diseaseId',
    exportValue: row => row.disease.id,
  },
  {
    label: 'diseaseName',
    exportValue: row => row.disease.name,
  },
  {
    label: 'phase',
    exportValue: row => row.phase,
  },
  {
    label: 'status',
    exportValue: row => row.status,
  },
  {
    label: 'source',
    exportValue: row => row.urls.map(reference => reference.url),
  },
];

function Body({ definition, id: ensgId, label: symbol }) {
  return (
    <KnownDrugsBody
      definition={definition}
      entity="target"
      variables={{ ensgId }}
      BODY_QUERY={KNOWN_DRUGS_BODY_QUERY}
      Description={() => <Description symbol={symbol} />}
      columnsToShow={['drug', 'disease', 'clinicalTrials']}
      stickyColumn="drug"
      exportColumns={exportColumns(ensgId)}
    />
  );
}

export default Body;
